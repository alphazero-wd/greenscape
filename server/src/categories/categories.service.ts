import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { removeWhiteSpaces } from '../common/utils';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';
import { FindManyDto } from '../common/dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create({ name }: CreateCategoryDto) {
    try {
      const newCategory = await this.prisma.category.create({
        data: { name: removeWhiteSpaces(name) },
      });
      return newCategory;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaError.UniqueViolation)
          throw new BadRequestException({
            success: false,
            message:
              'Category with the given `name` already exists in the store',
          });
      }
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
      });
    }
  }

  async findAll({
    limit,
    order = 'asc',
    sortBy = 'id',
    offset = 0,
    q = '',
  }: FindManyDto) {
    const where: Prisma.CategoryWhereInput = {
      name: {
        search: q ? removeWhiteSpaces(q).split(' ').join(' & ') : undefined,
        mode: 'insensitive',
      },
    };
    let orderBy = {};
    if (sortBy === 'products') orderBy = { products: { _count: order } };
    else orderBy = { [sortBy]: order };
    try {
      const categories = await this.prisma.category.findMany({
        take: limit,
        orderBy,
        skip: offset,
        where,
        include: {
          products: {
            take: 1,
            select: { images: { take: 1, select: { id: true, url: true } } },
          },
          _count: { select: { products: true } },
        },
      });

      const count = await this.prisma.category.count({
        where,
      });
      return {
        count,
        categories,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  async update(id: number, { name }: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: { name: removeWhiteSpaces(name) },
      });
      return updatedCategory;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaError.UniqueViolation)
          throw new BadRequestException({
            success: false,
            message:
              'Category with the given `name` already exists in the store',
          });
        if (error.code === PrismaError.RecordNotFound)
          throw new NotFoundException({
            success: false,
            message:
              'Cannot update the category because it is not found with the given `id`',
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
        const { count } = await transactionClient.category.deleteMany({
          where: { id: { in: ids } },
        });
        if (count !== ids.length)
          throw new NotFoundException({
            success: false,
            message: `${
              ids.length - count
            } categories were not deleted because they were not found`,
          });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
          if (error.code === PrismaError.ForeignViolation)
            throw new ForbiddenException({
              success: false,
              message:
                'Cannot delete categories because they are linked to existing products',
            });
        if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException({
          success: false,
          message: 'Something went wrong',
        });
      }
    });
  }
}
