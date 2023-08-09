import { IsHexColor, Length } from 'class-validator';

export class CreateColorDto {
  @Length(1, 20)
  name: string;

  @IsHexColor()
  hexCode: string;
}
