import { Type } from 'class-transformer';
import { IsInt, IsOptional, Length, Min } from 'class-validator';

export class CreateVariationDto {
  @Length(1, 20)
  name: string;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  productId: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  colorId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  sizeId?: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  price: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  inStock: number;
}
