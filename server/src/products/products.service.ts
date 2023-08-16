import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, FindManyProductsDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';
import { removeWhiteSpaces } from '../common/utils';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create({ categoryIds, name, ...createProductDto }: CreateProductDto) {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          name: removeWhiteSpaces(name),
          ...createProductDto,
          categories: {
            connect: categoryIds.map((id) => ({ id })),
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
  }: FindManyProductsDto) {
    try {
      let products = await this.prisma.product.findMany({
        take: limit,
        orderBy: { [sortBy]: order || 'asc' },
        skip: offset,
        where: {
          name: { startsWith: q, mode: 'insensitive' },
          categories: { some: { id: { in: categoryIds } } },
        },
        include: {
          colors: true,
          variations: { select: { images: { select: { id: true }, take: 1 } } },
          _count: { select: { variations: true } },
        },
      });
      const count = await this.prisma.product.count({
        where: {
          name: { startsWith: q, mode: 'insensitive' },
          categories: { some: { id: { in: categoryIds } } },
        },
      });
      const distinctSizes = await this.prisma.product.findMany({
        where: { categories: { some: { id: { in: categoryIds } } } },
        select: { sizes: { distinct: 'label' } },
      });
      for (let product of products) {
        const { _min, _max } = await this.prisma.variation.aggregate({
          _max: { price: true },
          _min: { price: true },
          where: { productId: product.id },
        });
        products = products.map((product) => ({
          ...product,
          priceRange: [_min, _max],
        }));
      }

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
        variations: { where: { colorId, sizeId } },
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
    { categoryIds, ...updateProductDto }: UpdateProductDto,
  ) {
    try {
      const categoryIdsObj = categoryIds.map((id) => ({ id }));
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          ...updateProductDto,
          categories: {
            connect: categoryIdsObj,
          },
        },
      });
      return updatedProduct;
    } catch (error) {
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
