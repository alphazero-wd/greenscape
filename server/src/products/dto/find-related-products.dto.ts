import { Transform } from 'class-transformer';
import { ArrayMinSize, IsInt, Min } from 'class-validator';

export class FindRelatedProductsDto {
  @Transform(({ value }: { value: string }) =>
    value.split(',').map((id) => +id),
  )
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  refIds: number[];
}
