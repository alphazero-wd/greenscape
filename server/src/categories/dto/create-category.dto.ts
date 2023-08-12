import { Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(1, 20)
  name: string;
}
