import { IsBooleanString, IsNumberString, IsOptional } from 'class-validator';

export class CreateBillboardDto {
  @IsNumberString()
  storeId: string;

  @IsBooleanString()
  @IsOptional()
  isFeatured?: string;
}
