import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadFileDto } from '../files/dto';
import { FilesService } from '../files/files.service';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';
import { CreateBillboardDto, UpdateBillboardDto } from './dto';

@Injectable()
export class BillboardsService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
  ) {}

  async create(
    { storeId, isFeatured }: CreateBillboardDto,
    uploadFileDto: UploadFileDto,
  ) {
    return this.prisma.$transaction(async (transactionClient) => {
      const newFile = await this.filesService.create(uploadFileDto);
      try {
        const newBillboard = await transactionClient.billboard.create({
          data: {
            storeId: +storeId,
            isFeatured: !!isFeatured,
            imageId: newFile.id,
          },
        });
        return newBillboard;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError)
          if (error.code === PrismaError.ForeignViolation)
            throw new BadRequestException({
              success: false,
              message:
                'Cannot create billboard because the store with the given `storeId` is not found',
            });
        throw new InternalServerErrorException({
          success: false,
          message: 'Something went wrong',
        });
      }
    });
  }

  findAll(where?: Prisma.BillboardWhereInput) {
    return this.prisma.billboard.findMany({ where });
  }

  update(id: number, { isFeatured }: UpdateBillboardDto) {
    return this.prisma.billboard.update({
      where: { id },
      data: { isFeatured: !!isFeatured },
    });
  }

  async remove(ids: number[]) {
    await this.prisma.$transaction(async (transactionClient) => {
      const billboardsToBeRemoved = await transactionClient.billboard.findMany({
        where: { id: { in: ids } },
      });
      if (billboardsToBeRemoved.length !== ids.length)
        throw new NotFoundException({
          success: false,
          message: `${
            ids.length - billboardsToBeRemoved.length
          } categories were not deleted because they were not found`,
        });
      const imageIds = billboardsToBeRemoved.map(({ imageId }) => imageId);
      await this.filesService.remove(imageIds);
    });
  }
}
