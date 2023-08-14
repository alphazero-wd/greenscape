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

  async create({ name, parentCategoryId }: CreateCategoryDto) {
    try {
      const newCategory = await this.prisma.category.create({
        data: { name: removeWhiteSpaces(name), parentCategoryId },
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
        if (error.code === PrismaError.ForeignViolation)
          throw new NotFoundException({
            success: false,
            message:
              'Cannot create category because the parent category with the given `parentCategoryId` is not found',
          });
      }
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
      });
    }
  }

  async findAll({ limit, order, sortBy, offset, q }: FindManyDto) {
    const categories = await this.prisma.category.findMany({
      take: limit,
      orderBy: { [sortBy || 'id']: order || 'asc' },
      skip: offset,
      where: q ? { name: { startsWith: q, mode: 'insensitive' } } : undefined,
      include: {
        _count: {
          select: { products: true, subCategories: true },
        },
        products: {
          take: 1,
          select: { images: { take: 1, select: { imageId: true } } },
        },
        parentCategory: true,
        subCategories: true,
      },
    });
    const count = await this.prisma.category.count({
      where: q ? { name: { startsWith: q, mode: 'insensitive' } } : undefined,
    });
    return {
      count,
      categories,
    };
  }

  async update(id: number, { name, parentCategoryId }: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: { name: removeWhiteSpaces(name), parentCategoryId },
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
        if (error.code === PrismaError.ForeignViolation)
          throw new NotFoundException({
            success: false,
            message:
              'Cannot update category because the parent category with the given `parentCategoryId` is not found',
          });
      }
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
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
