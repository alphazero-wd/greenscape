import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';
import { removeWhiteSpaces } from '../common/utils';
import { CreateColorDto, UpdateColorDto } from './dto';

@Injectable()
export class ColorsService {
  constructor(private prisma: PrismaService) {}

  async create({ name, ...createColorDto }: CreateColorDto) {
    try {
      const newColor = await this.prisma.color.create({
        data: { name: removeWhiteSpaces(name), ...createColorDto },
      });
      return newColor;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        switch (error.code) {
          case PrismaError.UniqueViolation:
            throw new BadRequestException({
              success: false,
              message: 'The provided color already exists in the store',
            });
          case PrismaError.ForeignViolation:
            throw new BadRequestException({
              success: false,
              message:
                'Cannot create color because the store with the given `storeId` is not found',
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

  async update(id: number, { name, ...updateColorDto }: UpdateColorDto) {
    try {
      const updatedColor = await this.prisma.color.update({
        where: { id },
        data: { ...updateColorDto, name: removeWhiteSpaces(name) },
      });
      return updatedColor;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        switch (error.code) {
          case PrismaError.UniqueViolation:
            throw new BadRequestException({
              success: false,
              message: 'The provided color already exists in the store',
            });
          case PrismaError.RecordNotFound:
            throw new BadRequestException({
              success: false,
              message:
                'Cannot update color because the color with the given `id` is not found',
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

  async remove(ids: number[]) {
    const { count } = await this.prisma.color.deleteMany({
      where: { id: { in: ids } },
    });
    if (count === 0)
      throw new NotFoundException({
        success: false,
        message: 'Please select 1 or more records to delete',
      });
  }
}
