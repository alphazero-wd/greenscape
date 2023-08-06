import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadFileDto } from './dto';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  create(uploadFileDto: UploadFileDto) {
    return this.prisma.$transaction(async (transactionClient) =>
      transactionClient.file.create({ data: uploadFileDto }),
    );
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
