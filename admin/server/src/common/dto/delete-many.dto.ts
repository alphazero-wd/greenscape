import { Matches } from 'class-validator';

export class DeleteManyDto {
  @Matches(/^\d+(,\d+)*$/, { message: 'Invalid ids' })
  ids: string;
}
