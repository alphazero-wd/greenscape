import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from '../prisma/prisma.service';
import { removeWhiteSpaces } from '../common/utils';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  private async checkDuplicateStore(name: string, ownerId: number) {
    const store = await this.prisma.store.findFirst({
      where: { name: removeWhiteSpaces(name), ownerId },
    });
    if (store)
      throw new BadRequestException({
        success: false,
        message: 'Store with that name already exists',
      });
  }

  async create({ name }: CreateStoreDto, ownerId: number) {
    await this.checkDuplicateStore(name, ownerId);
    const newStore = await this.prisma.store.create({
      data: { name: removeWhiteSpaces(name), ownerId },
    });
    return newStore;
  }

  findAll(ownerId: number) {
    return this.prisma.store.findMany({ where: { ownerId } });
  }

  async findOne(id: number, ownerId: number) {
    const store = await this.prisma.store.findUnique({
      where: { id, ownerId },
    });
    if (!store)
      throw new NotFoundException({
        success: false,
        message: 'Store with that id does not exist',
      });
    return store;
  }

  async update(id: number, { name }: UpdateStoreDto, ownerId: number) {
    await this.findOne(id, ownerId);
    await this.checkDuplicateStore(name, ownerId);
    const updatedStore = await this.prisma.store.update({
      where: { id, ownerId },
      data: { name: removeWhiteSpaces(name) },
    });
    return updatedStore;
  }

  async remove(id: number, ownerId: number) {
    await this.findOne(id, ownerId);
    await this.prisma.store.delete({ where: { id } });
  }
}
