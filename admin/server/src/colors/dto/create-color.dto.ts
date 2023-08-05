import { IsHexColor, IsInt, Length, Min } from 'class-validator';

export class CreateColorDto {
  @Length(1, 20)
  name: string;

  @IsHexColor()
  hexCode: string;

  @IsInt()
  @Min(1)
  storeId: number;
}
