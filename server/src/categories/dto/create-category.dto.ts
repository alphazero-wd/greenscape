import { IsInt, IsOptional, Length, Min } from 'class-validator';

export class CreateCategoryDto {
  @Length(1, 60)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  parentCategoryId?: number;
}
