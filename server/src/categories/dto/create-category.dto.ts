import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(1, 20)
  name: string;

  @IsString()
  @IsOptional()
  desc?: string;
}
