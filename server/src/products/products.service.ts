import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, FindManyProductsDto, UpdateProductDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

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

  async findAll({
    limit = 10,
    categoryIds,
    offset = 0,
    q = '',
    sortBy = 'id',
    order = 'asc',
    price,
    status = 'Active',
    inStock,
  }: FindManyProductsDto) {
    try {
      const where: Prisma.ProductWhereInput = {};
      where.name = q ? { search: q, mode: 'insensitive' } : undefined;
      where.status = status ?? undefined;
      where.categoryId = { in: categoryIds };
      if (price) {
        if (price.length >= 1) where.price = { gte: price[0] };
        if (price.length == 2) where.price = { lte: price[1] };
      }
      if (inStock !== undefined)
        where.inStock = inStock ? { gt: 0 } : { equals: 0 };

      const products = await this.prisma.product.findMany({
        take: limit,
        skip: offset,
        orderBy: { [sortBy]: order },
        where,
        include: { images: true, category: true },
      });
      const count = await this.prisma.product.count();
      return { count, products };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
      });
    }
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true, category: true },
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

  async remove(ids: number[]) {
    return this.prisma.$transaction(async (transactionClient) => {
      try {
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
