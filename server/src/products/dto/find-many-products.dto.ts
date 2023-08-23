import { Transform } from 'class-transformer';
import { FindManyDto } from '../../common/dto';
import { IsIn, IsInt, IsOptional } from 'class-validator';

export class FindManyProductsDto extends FindManyDto {
  @Transform(({ value }: { value: string }) =>
    value.split(',').map((id) => +id),
  )
  @IsInt({ each: true })
  @IsOptional()
  categoryIds?: number[];

  @Transform(({ value }: { value: string }) =>
    value.split(',').map((id) => +id),
  )
  @IsInt({ each: true })
  @IsOptional()
  sizeIds?: number[];

  @IsOptional()
  @IsIn(['Active', 'Draft'])
  status?: 'Active' | 'Draft';
}
