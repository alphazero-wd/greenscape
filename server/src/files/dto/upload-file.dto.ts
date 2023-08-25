import { IsMimeType, IsString } from 'class-validator';

export class UploadFileDto {
  @IsString()
  filename: string;

  @IsString()
  path: string;

  @IsMimeType()
  mimetype: string;
}
