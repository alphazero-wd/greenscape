import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVariationDto, UpdateVariationDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { removeWhiteSpaces } from '../common/utils';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';

@Injectable()
export class VariationsService {
  constructor(private prisma: PrismaService) {}

  async create({ name, ...createVariationDto }: CreateVariationDto) {
    try {
      const newVariation = await this.prisma.variation.create({
        data: {
          name: removeWhiteSpaces(name),
          ...createVariationDto,
        },
      });
      return newVariation;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        switch (error.code) {
          case PrismaError.ForeignViolation:
            throw new NotFoundException({
              success: false,
              message:
                'Cannot create variation because the product, color, or size is not found',
            });
          case PrismaError.UniqueViolation:
            throw new BadRequestException({
              success: false,
              message: 'The variation name has already existed in the product',
            });
          default:
            break;
        }

      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  async update(
    id: number,
    { name, ...updateVariationDto }: UpdateVariationDto,
  ) {
    try {
      const updatedVariation = await this.prisma.variation.update({
        where: { id },
        data: {
          name: removeWhiteSpaces(name),
          ...updateVariationDto,
        },
      });
      return updatedVariation;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        switch (error.code) {
          case PrismaError.UniqueViolation:
            throw new BadRequestException({
              success: false,
              message: 'The variation name has already existed in the product',
            });
          case PrismaError.RecordNotFound:
            throw new BadRequestException({
              success: false,
              message:
                'Cannot update the variation with the given `id` because it is not found',
            });
          default:
            break;
        }

      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.variation.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        switch (error.code) {
          case PrismaError.RecordNotFound:
            throw new BadRequestException({
              success: false,
              message:
                'Cannot update the variation with the given `id` because it is not found',
            });
          default:
            break;
        }
      throw new InternalServerErrorException({
        success: false,
        message: error.message,
      });
    }
  }
}
