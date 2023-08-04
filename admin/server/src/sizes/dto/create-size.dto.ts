import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateSizeDto {
  @Length(1, 20)
  label: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsInt()
  @Min(1)
  storeId: number;
}
