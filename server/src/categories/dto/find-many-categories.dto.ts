import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';
import { FindManyDto } from '../../common/dto';
import { Type } from 'class-transformer';

export class FindManyCategoriesDto extends FindManyDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  pid?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  hierarchy?: boolean;
}
