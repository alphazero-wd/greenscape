import { Transform, Type } from 'class-transformer';
import { FindManyDto } from '../../common/dto';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class FindManyProductsDto extends FindManyDto {
  @Transform(({ value }: { value: string }) =>
    value.split(',').map((val) => +val),
  )
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 },
    { each: true },
  )
  @IsOptional({ each: true })
  price?: [number, number];

  @Transform(({ value }: { value: string }) =>
    value.split(',').map((id) => +id),
  )
  @IsInt({ each: true })
  @Min(1, { each: true })
  @IsOptional()
  categoryIds?: number[];

  @IsOptional()
  @IsIn(['Active', 'Draft'])
  status?: 'Active' | 'Draft';

  @Transform(({ value }) => (value === 'false' ? false : true))
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;
}
