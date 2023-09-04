import { OmitType } from '@nestjs/mapped-types';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { FindManyDto } from '../../common/dto';
import { Transform, Type } from 'class-transformer';
import { allowedCountries } from '../../common/utils';

export class FindManyOrdersDto extends OmitType(FindManyDto, [
  'sortBy',
  'order',
]) {
  @IsOptional()
  @IsIn(['delivered', 'pending'])
  status?: 'delivered' | 'pending';

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    value.split(',').map((val) => +val),
  )
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 },
    { each: true },
  )
  totalRange?: [number, number];

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsOptional()
  shippingCost?: number;

  @Transform(({ value }: { value: string }) => value.split(','))
  @ArrayMinSize(1)
  @IsIn(allowedCountries, { each: true })
  @IsOptional()
  countries?: string[];
}
