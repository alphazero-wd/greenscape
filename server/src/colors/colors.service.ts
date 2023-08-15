import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';
import { CreateColorDto, UpdateColorDto } from './dto';
import { FindManyDto } from '../common/dto';

@Injectable()
export class ColorsService {
  constructor(private prisma: PrismaService) {}

  async create({ hexCode }: CreateColorDto) {
    try {
      const newColor = await this.prisma.color.create({
        data: { hexCode },
      });
      return newColor;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        switch (error.code) {
          case PrismaError.UniqueViolation:
            throw new BadRequestException({
              success: false,
              message: 'The provided hex color already exists',
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

  async findAll({
    limit = 10,
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    q = '',
  }: FindManyDto) {
    const colors = await this.prisma.color.findMany({
      take: limit,
      orderBy: { [sortBy]: order || 'asc' },
      skip: offset,
      where: { hexCode: { startsWith: q, mode: 'insensitive' } },
      include: { _count: { select: { variants: true } } },
    });
    const count = await this.prisma.color.count({
      where: { hexCode: { startsWith: q, mode: 'insensitive' } },
    });
    return { count, colors };
  }

  async update(id: number, { hexCode }: UpdateColorDto) {
    try {
      const updatedColor = await this.prisma.color.update({
        where: { id },
        data: { hexCode },
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
      try {
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
      } catch (error) {
        throw new InternalServerErrorException({
          success: false,
          message: 'Something went wrong',
        });
      }
    });
  }
}
