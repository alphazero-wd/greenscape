import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['sizeIds', 'colorIds']),
) {
  @IsOptional()
  @IsInt()
  @Min(1)
  sizeId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  colorId?: number;
}
