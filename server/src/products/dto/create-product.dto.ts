import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @Length(1, 120)
  name: string;

  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsOptional()
  sizeChart?: string;

  @IsInt({ each: true })
  @Min(1)
  categoryIds: number[];
}
