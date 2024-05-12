import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadFileDto } from './dto';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  DeleteObjectCommand,
  CompleteMultipartUploadCommandOutput,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
  s3Client: S3Client;
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.s3Client = new S3Client({});
  }

  async createMany(uploadFilesDto: UploadFileDto[]) {
    const uploadResults = await this.uploadToS3(uploadFilesDto);
    await this.prisma.file.createMany({
      data: uploadResults.map(({ Key, Location }) => ({
        id: Key,
        url: Location,
      })),
    });
    return uploadResults;
  }

  private async uploadToS3(uploadFilesDto: UploadFileDto[]) {
    const uploadResults: CompleteMultipartUploadCommandOutput[] = [];
    for (const { filename, buffer } of uploadFilesDto) {
      const key = `${v4()}-${filename}`;
      const multipartUpload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Key: this.configService.get('AWS_OBJECT_DEST') + key,
          Body: buffer,
        },
      });
      const result = await multipartUpload.done();
      uploadResults.push(result);
    }
    return uploadResults;
  }

  async findOne(id: string) {
    const file = await this.prisma.file.findUnique({
      where: { id },
    });
    if (!file)
      throw new NotFoundException({
        success: false,
        message: 'Cannot find file with the given `id`',
      });
    return file;
  }

  async remove(keys: string[]) {
    for (const key of keys) {
      const command = new DeleteObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: this.configService.get('AWS_OBJECT_DEST') + key,
        ExpectedBucketOwner: this.configService.get('AWS_ACCOUNT_ID'),
      });
      const result = await this.s3Client.send(command);
      console.log({ result });
    }
    await this.prisma.file.deleteMany({ where: { id: { in: keys } } });
  }
}
