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
          default:
            break;
        }
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
      });
    }
  }

  findAll() {
    return this.prisma.color.findMany();
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
    return this.prisma.$transaction(async (transactionClient) => {
      const { count } = await transactionClient.color.deleteMany({
        where: { id: { in: ids } },
      });
      if (count !== ids.length)
        throw new NotFoundException({
          success: false,
          message: `${
            ids.length - count
          } colors were not deleted because they were not found`,
        });
    });
  }
}
