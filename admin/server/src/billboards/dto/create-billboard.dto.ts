import { IsBooleanString, IsOptional } from 'class-validator';

export class CreateBillboardDto {
  @IsBooleanString()
  @IsOptional()
  isFeatured?: string;
}
