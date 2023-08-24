import { Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(1, 60)
  name: string;
}
