import { Transform, Type } from 'class-transformer';
import { FindManyDto } from '../../common/dto';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Matches,
  Min,
} from 'class-validator';
import { Status } from '@prisma/client';
import { VALID_DATE_REGEX } from '../../common/constants';

export class FindManyProductsDto extends FindManyDto {
  @Transform(({ value }: { value: string }) =>
    value.split(',').map((val) => +val),
  )
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  @IsOptional({ each: true })
  price?: [number, number];

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @Transform(({ value }) => (value === 'false' ? false : true))
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

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
}
