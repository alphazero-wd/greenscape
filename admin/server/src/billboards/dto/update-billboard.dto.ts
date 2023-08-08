import { IsBoolean } from 'class-validator';

export class UpdateBillboardDto {
  @IsBoolean()
  isFeatured: boolean;
}
