import { IsOptional, IsString, Length } from 'class-validator';

export class CreateSizeDto {
  @Length(1, 20)
  label: string;

  @IsString()
  @IsOptional()
  desc?: string;
}
