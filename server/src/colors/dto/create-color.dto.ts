import { IsHexColor, Length } from 'class-validator';

export class CreateColorDto {
  @Length(7, 7)
  @IsHexColor()
  hexCode: string;

  @Length(1, 20)
  name: string;
}
