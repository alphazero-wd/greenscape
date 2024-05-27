import {
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { VALID_SLUG_REGEX } from '../../common/constants';
import { Status } from '@prisma/client';

export class CreateProductDto {
  @Length(1, 120)
  @IsString()
  name: string;

  @Matches(VALID_SLUG_REGEX, { message: 'invalid slug' })
  @IsString()
  @Length(1, 120)
  slug: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @Min(0.01)
  price: number;

  @IsInt()
  @Min(0)
  inStock: number;

  @IsInt({ each: true })
  @Min(1, { each: true })
  categoryIds: number[];

  @IsEnum(Status)
  status: Status;
}
