import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UploadFileDto } from '../files/dto';
import { FilesService } from '../files/files.service';
import { PrismaError } from '../prisma/prisma-error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, FindManyProductsDto, UpdateProductDto } from './dto';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  async create({ categoryIds, ...dto }: CreateProductDto) {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          ...dto,
          categories: {
            connect: categoryIds.map((id) => ({ id })),
          },
        },
      });
      return newProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaError.UniqueViolation)
          throw new BadRequestException({
            success: false,
            message: 'Product with the given name already exists',
          });
        if (error.code === PrismaError.RecordNotFound)
          throw new BadRequestException({
            success: false,
            message:
              'Cannot create product because of unknown category provided',
          });
      }
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  async uploadProductImages(
    productId: number,
    imagesUploadDto: UploadFileDto[],
  ) {
    const uploadResults = await this.filesService.createMany(imagesUploadDto);
    await this.prisma.image.createMany({
      data: uploadResults.map(({ Key }) => ({
        fileId: Key,
        productId,
      })),
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  private formQueries(
    {
      q,
      status,
      price,
      inStock,
      refIds,
      from,
      to,
      sortBy,
      order,
    }: FindManyProductsDto,
    slug?: string,
  ) {
    const where: Prisma.ProductWhereInput = {};
    where.name = {
      contains: q,
      mode: 'insensitive',
    };
    if (status) where.status = status;
    if (slug) where.categories = { some: { slug } };
    if (price) {
      where.price = {};
      if (price[0]) where.price.gte = price[0];
      if (price[1]) where.price.lte = price[1];
    }
    if (inStock !== undefined)
      where.inStock = inStock ? { gt: 0 } : { equals: 0 };
    if (refIds) where.id = { not: { in: refIds } };
    let start: Date, end: Date;
    if (from) start = startOfDay(new Date(from));
    if (to) end = endOfDay(new Date(to));

    where.createdAt = {
      gte: start,
      lte: end,
    };

    let orderBy: Prisma.ProductOrderByWithRelationAndSearchRelevanceInput = {};
    if (sortBy === 'orders') orderBy = { orders: { _count: order } };
    else orderBy = { [sortBy]: order };
    return { where, orderBy };
  }

  async paginate(
    dto: Omit<FindManyProductsDto, 'limit' | 'offset' | 'sortBy' | 'order'>,
    slug: string = '',
  ) {
    const { where } = this.formQueries(dto, slug);
    return this.prisma.product.count({ where });
  }

  async findAll(
    { limit = 10, offset = 0, ...findManyProductsDto }: FindManyProductsDto,
    slug?: string,
  ) {
    try {
      const { where, orderBy } = this.formQueries(findManyProductsDto, slug);
      const products = await this.prisma.product.findMany({
        take: limit,
        skip: offset,
        orderBy,
        where,
        select: {
          id: true,
          slug: true,
          name: true,
          inStock: true,
          price: true,
          createdAt: true,
          desc: true,
          status: true,
          images: {
            select: { file: { select: { url: true } } },
            take: 1,
          },
          _count: { select: { orders: true } },
        },
      });
      return products;
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
      });
    }
  }

  async aggregate(field: 'status' | 'inStock', dto: FindManyProductsDto) {
    const { where } = this.formQueries(dto);
    delete where[field];
    return this.prisma.product.groupBy({
      by: field,
      _count: { id: true },
      where,
    });
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        categories: true,
        images: {
          select: { file: { select: { id: true, url: true } } },
        },
      },
    });
    if (!product)
      throw new NotFoundException({
        success: false,
        message: 'Product not found',
      });
    return product;
  }

  async update(id: number, { categoryIds, ...dto }: UpdateProductDto) {
    try {
      const { categories } = await this.prisma.product.findUnique({
        where: { id },
        select: { categories: true },
      });
      const updatedCategoryIdsSet = new Set(categoryIds);
      const currentCategoryIdsSet = new Set(categories.map((c) => c.id));
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          ...dto,
          categories: {
            disconnect: categories
              .filter((c) => !updatedCategoryIdsSet.has(c.id))
              .map(({ id }) => ({ id })),
            connect: categoryIds
              .filter((id) => !currentCategoryIdsSet.has(id))
              .map((id) => ({ id })),
          },
        },
      });
      return updatedProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaError.UniqueViolation)
          throw new BadRequestException({
            success: false,
            message: 'Product with the given name already exists',
          });
        if (error.code === PrismaError.RecordNotFound)
          throw new BadRequestException({
            success: false,
            message:
              'Cannot create product because either it is not found or category provided is unknown',
          });
      }
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  async removeImages(productId: number, imageIds: string[]) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: {
        images: { select: { file: { select: { id: true } } } },
      },
    });
    const productImageIds = product.images.map((img) => img.file.id);
    if (imageIds.some((id) => !productImageIds.includes(id)))
      throw new NotFoundException({
        success: false,
        message: 'Cannot delete images because some of which are not found',
      });
    if (imageIds.length === product.images.length)
      throw new ForbiddenException({
        success: false,
        message: 'Cannot delete all images of the product',
      });
    await this.filesService.remove(imageIds);
  }

  async remove(ids: number[]) {
    try {
      const productsWithImagesOnly = await this.prisma.product.findMany({
        where: { id: { in: ids } },
        select: { images: { select: { fileId: true } } },
      });
      if (productsWithImagesOnly.length !== ids.length)
        throw new NotFoundException({
          success: false,
          message: `${
            ids.length - productsWithImagesOnly.length
          } products were not deleted because they were not found`,
        });
      const imageKeys = productsWithImagesOnly.flatMap((img) =>
        img.images.map((image) => image.fileId),
      );
      await this.filesService.remove(imageKeys);
      await this.prisma.product.deleteMany({
        where: { id: { in: ids } },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }
}
