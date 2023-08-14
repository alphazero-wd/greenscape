import { Length } from 'class-validator';

export class CreateSizeDto {
  @Length(1, 20)
  label: string;
}
