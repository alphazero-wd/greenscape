import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class DeleteManyDto {
  @Transform(({ value }: { value: string }) =>
    value.split(',').map((id) => +id),
  )
  @IsInt({ each: true })
  ids: number[];
}
