import { Length } from 'class-validator';

export class CreateStoreDto {
  @Length(1, 64)
  name: string;
}
