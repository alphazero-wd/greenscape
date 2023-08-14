import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateCategoryDto {
  @Length(1, 20)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  parentCategoryId?: number;
}
