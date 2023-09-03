import { IsDateString } from 'class-validator';

export class UpdateOrderDto {
  @IsDateString()
  deliveredAt: Date;
}
