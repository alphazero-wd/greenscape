import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { removeWhiteSpaces } from '../common/utils';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create({ name, storeId }: CreateCategoryDto) {
    try {
      const newCategory = await this.prisma.category.create({
        data: { name: removeWhiteSpaces(name), storeId },
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
          throw new BadRequestException({
            success: false,
            message:
              'Cannot create category because the store with the given `storeId` does not exist',
          });
      }
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
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
        message: 'Something went wrong',
      });
    }
  }

  async remove(ids: number[]) {
    const { count } = await this.prisma.category.deleteMany({
      where: { id: { in: ids } },
    });
    if (count === 0)
      throw new NotFoundException({
        success: false,
        message: 'Please select 1 or more records to delete',
      });
  }
}
