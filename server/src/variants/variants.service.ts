import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVariantDto, UpdateVariantDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';

@Injectable()
export class VariantsService {
  constructor(private prisma: PrismaService) {}

  async create(createVariantDto: CreateVariantDto) {
    try {
      const newVariant = await this.prisma.variant.create({
        data: createVariantDto,
      });
      return newVariant;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        switch (error.code) {
          case PrismaError.ForeignViolation:
            throw new NotFoundException({
              success: false,
              message:
                'Cannot create variant because the product, color, or size is not found',
            });
          case PrismaError.UniqueViolation:
            throw new BadRequestException({
              success: false,
              message: 'The variant name has already existed in the product',
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

  async update(id: number, updateVariantDto: UpdateVariantDto) {
    try {
      const updatedVariant = await this.prisma.variant.update({
        where: { id },
        data: updateVariantDto,
      });
      return updatedVariant;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        switch (error.code) {
          case PrismaError.RecordNotFound:
            throw new BadRequestException({
              success: false,
              message:
                'Cannot update the variant with the given `id` because it is not found',
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
      await this.prisma.variant.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        switch (error.code) {
          case PrismaError.RecordNotFound:
            throw new BadRequestException({
              success: false,
              message:
                'Cannot update the variant with the given `id` because it is not found',
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
