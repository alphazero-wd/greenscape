import { OmitType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsIn,
  IsNumber,
  IsOptional,
  Matches,
} from 'class-validator';
import { VALID_DATE_REGEX } from '../../common/constants';
import { FindManyDto } from '../../common/dto';
import { allowedCountries } from '../../common/utils';

export class FindManyOrdersDto extends OmitType(FindManyDto, [
  'sortBy',
  'order',
]) {
  @IsOptional()
  @IsIn(['delivered', 'pending'])
  status?: 'delivered' | 'pending';

  @Matches(VALID_DATE_REGEX, {
    message: 'Please provide a valid date in the format of yyyy-mm-dd',
  })
  @IsOptional()
  from?: string;

  @Matches(VALID_DATE_REGEX, {
    message: 'Please provide a valid date in the format of yyyy-mm-dd',
  })
  @IsOptional()
  to?: string;

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
