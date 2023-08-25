import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadFileDto } from './dto';
import { rm } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async create(uploadFileDto: UploadFileDto, productId?: number) {
    await this.prisma.file.create({ data: { ...uploadFileDto, productId } });
  }

  async findOne(id: number) {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file)
      throw new NotFoundException({
        success: false,
        message: 'Cannot find file with the given `id`',
      });
    return file;
  }

  async remove(ids: number[]) {
    return this.prisma.$transaction(async (transactionClient) => {
      const files = await transactionClient.file.findMany({
        where: {
          id: { in: ids },
        },
      });
      files.forEach(async (file) => await rm(join(process.cwd(), file.path)));

      const { count } = await transactionClient.file.deleteMany({
        where: { id: { in: ids } },
      });

      if (count !== ids.length)
        throw new NotFoundException({
          success: false,
          message: `${
            ids.length - count
          } files were not deleted because they were not found`,
        });
    });
  }
}
