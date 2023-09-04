import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @Length(1, 120)
  name: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @Min(0.01)
  price: number;

  @IsInt()
  @Min(0)
  inStock: number;

  @IsInt()
  @Min(1)
  categoryId: number;

  @IsIn(['Active', 'Draft'])
  status: 'Active' | 'Draft';
}
