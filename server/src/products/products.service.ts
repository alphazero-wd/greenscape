import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, FindManyProductsDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';
import { removeWhiteSpaces } from '../common/utils';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create({
    name,
    colorIds,
    sizeIds,
    ...createProductDto
  }: CreateProductDto) {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          name: removeWhiteSpaces(name),
          ...createProductDto,
          colors: {
            connect: colorIds.map((id) => ({ id })),
          },
          sizes: {
            connect: sizeIds.map((id) => ({ id })),
          },
        },
      });
      return newProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaError.ForeignViolation:
            throw new BadRequestException({
              success: false,
              message:
                'Some categories in `categoryIds` were not found upon product creation',
            });
          case PrismaError.UniqueViolation:
            throw new BadRequestException({
              success: false,
              message: 'Product the given name already exists',
            });
          default:
            break;
        }
      }
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
      });
    }
  }

  async findAll({
    limit = 10,
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    q = '',
    categoryIds,
    status = 'public',
  }: FindManyProductsDto) {
    try {
      const where: Prisma.ProductWhereInput = {
        name: {
          search: q ? removeWhiteSpaces(q).split(' ').join(' & ') : undefined,
          mode: 'insensitive',
        },
        category: { id: { in: categoryIds } },
        isPublic:
          status === 'public' ? true : status === 'private' ? false : {},
      };
      let products = await this.prisma.product.findMany({
        take: limit,
        orderBy: { [sortBy]: order || 'asc' },
        skip: offset,
        where,
        include: {
          colors: true,
          sizes: true,
          category: {
            include: { parentCategory: { include: { parentCategory: true } } },
          },
          variants: { select: { images: { select: { id: true }, take: 1 } } },
          _count: { select: { variants: true } },
        },
      });
      // for pagination
      const count = await this.prisma.product.count({
        where,
      });
      // for filter purposes
      const distinctSizes = await this.prisma.size.findMany({
        distinct: 'label',
        where: { products: { some: { categoryId: { in: categoryIds } } } },
      });
      for (let product of products) {
        const { _min, _max } = await this.prisma.variant.aggregate({
          _max: { price: true },
          _min: { price: true },
          where: { productId: product.id },
        });
        products = products.map((product) => ({
          ...product,
          priceRange: [_min.price || 0.0, _max.price || 0.0],
        }));
      }

      if (sortBy === 'price')
        products = products.sort((pa: any, pb: any) => {
          return order === 'asc'
            ? pa.priceRange[0] - pb.priceRange[0]
            : pb.priceRange[1] - pa.priceRange[1];
        });

      return { count, products, sizes: distinctSizes };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  async findOne(id: number, colorId?: number, sizeId?: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        variants: { where: { colorId, sizeId } },
        colors: true,
        sizes: true,
      },
    });
    if (!product)
      throw new NotFoundException({
        success: false,
        message: 'Cannot find product with the given `id`',
      });
    return product;
  }

  async update(
    id: number,
    { colorIds, sizeIds, ...updateProductDto }: UpdateProductDto,
  ) {
    try {
      const data: Prisma.ProductUpdateInput = { ...updateProductDto };
      if (colorIds) data.colors = { connect: colorIds.map((id) => ({ id })) };
      if (sizeIds) data.sizes = { connect: sizeIds.map((id) => ({ id })) };
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data,
      });
      return updatedProduct;
    } catch (error) {
      switch (error.code) {
        case PrismaError.UniqueViolation:
          throw new BadRequestException({
            success: false,
            message: 'Product the given name already exists',
          });
        case PrismaError.RecordNotFound:
          throw new NotFoundException({
            success: false,
            message: 'Cannot update product because it is not found',
          });
        default:
          break;
      }
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
      });
    }
  }

  remove(ids: number[]) {
    return this.prisma.$transaction(async (transactionClient) => {
      const { count } = await transactionClient.product.deleteMany({
        where: { id: { in: ids } },
      });
      if (count !== ids.length)
        throw new NotFoundException({
          success: false,
          message: `${
            ids.length - count
          } products were not deleted because they were not found`,
        });
    });
  }
}
