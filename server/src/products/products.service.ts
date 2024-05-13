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

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.prisma.product.create({
        data: createProductDto,
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

  private formQueries({
    q,
    status,
    categoryIds,
    price,
    inStock,
    refIds,
    sortBy,
    order,
  }: FindManyProductsDto) {
    const where: Prisma.ProductWhereInput = {};
    where.name = {
      contains: q,
      mode: 'insensitive',
    };
    if (status) where.status = status;
    if (categoryIds) where.categories = { some: { id: { in: categoryIds } } };
    if (price) {
      where.price = {};
      if (price[0]) where.price.gte = price[0];
      if (price[1]) where.price.lte = price[1];
    }
    if (inStock !== undefined)
      where.inStock = inStock ? { gt: 0 } : { equals: 0 };
    if (refIds) where.id = { not: { in: refIds } };

    let orderBy: Prisma.ProductOrderByWithRelationAndSearchRelevanceInput = {};
    if (sortBy === 'orders') orderBy = { orders: { _count: order } };
    else orderBy = { [sortBy]: order };
    return { where, orderBy };
  }

  async findAll({
    limit = 10,
    offset = 0,
    ...findManyProductsDto
  }: FindManyProductsDto) {
    try {
      const { where, orderBy } = this.formQueries(findManyProductsDto);
      const products = await this.prisma.product.findMany({
        take: limit,
        skip: offset,
        orderBy,
        where,
        select: {
          id: true,
          name: true,
          inStock: true,
          price: true,
          createdAt: true,
          updatedAt: true,
          desc: true,
          status: true,
          images: {
            select: { file: { select: { url: true } } },
            take: 1,
          },
          categories: {
            include: { parentCategory: { include: { parentCategory: true } } },
          },
          _count: { select: { orders: true } },
        },
      });
      const count = await this.prisma.product.count({ where });
      return { products, count };
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
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
    return this.prisma.$transaction(async (transactionClient) => {
      try {
        const productsWithImagesOnly = await transactionClient.product.findMany(
          {
            where: { id: { in: ids } },
            select: { images: { select: { file: true } } },
          },
        );
        if (productsWithImagesOnly.length !== ids.length)
          throw new NotFoundException({
            success: false,
            message: `${
              ids.length - productsWithImagesOnly.length
            } products were not deleted because they were not found`,
          });
        const imageKeys = productsWithImagesOnly.flatMap((img) =>
          img.images.flatMap(({ file }) => file.id),
        );
        await this.filesService.remove(imageKeys);
        await transactionClient.product.deleteMany({
          where: { id: { in: ids } },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
          if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException({
          success: false,
          message: 'Something went wrong',
        });
      }
    });
  }
}
