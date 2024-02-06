import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class DeleteImagesDto {
  @Transform(({ value }: { value: string }) => value.split(',').map((id) => id))
  @IsString({ each: true })
  ids: string[];
}
