import { IsBooleanString, IsOptional } from 'class-validator';

export class FindBillboardsDto {
  @IsOptional()
  @IsBooleanString()
  featured?: string;
}
