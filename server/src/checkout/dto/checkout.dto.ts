import { ArrayMinSize, IsInt, Min } from 'class-validator';

export class CheckoutDto {
  @ArrayMinSize(1)
  bag: BagItem[];
}

class BagItem {
  @IsInt()
  @Min(1)
  productId: number;

  @IsInt()
  @Min(1)
  qty: number;
}
