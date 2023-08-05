import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from '../prisma/prisma.service';
import { removeWhiteSpaces } from '../common/utils';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  async create({ name }: CreateStoreDto, ownerId: number) {
    try {
      const newStore = await this.prisma.store.create({
        data: { name: removeWhiteSpaces(name), ownerId },
      });
      return newStore;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaError.UniqueViolation) {
          throw new BadRequestException({
            success: false,
            message: 'Store with that name already exists',
          });
        }
      }
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
      });
    }
  }

  findAll() {
    return this.prisma.store.findMany({
      include: { categories: { select: { name: true } } },
    });
  }

  async findOne(id: number, ownerId: number) {
    const store = await this.prisma.store.findUnique({
      where: { id, ownerId },
      include: { categories: true, sizes: true, colors: true },
    });
    if (!store)
      throw new NotFoundException({
        success: false,
        message: 'Store with that id does not exist',
      });
    return store;
  }

  async update(id: number, { name }: UpdateStoreDto, ownerId: number) {
    try {
      const updatedStore = await this.prisma.store.update({
        where: { id, ownerId },
        data: { name: removeWhiteSpaces(name) },
      });
      if (!updatedStore)
        throw new NotFoundException({
          success: false,
          message:
            'Cannot update the store because it is not found with the given `id`',
        });
      return updatedStore;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaError.UniqueViolation) {
          throw new BadRequestException({
            success: false,
            message: 'Store with that name already exists',
          });
        }
      }
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
      });
    }
  }

  async remove(id: number, ownerId: number) {
    const removedStore = await this.prisma.store.delete({
      where: { id, ownerId },
    });
    if (!removedStore)
      throw new NotFoundException({
        success: false,
        message:
          'Cannot delete the store because it is not found with the given `id`',
      });
  }
}
