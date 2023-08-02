import { IsInt, Length, Min } from 'class-validator';

export class CreateCategoryDto {
  @Length(1, 20)
  name: string;

  @IsInt()
  @Min(1)
  storeId: number;
}
