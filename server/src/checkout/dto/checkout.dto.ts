import { ArrayMinSize, IsInt, Min } from 'class-validator';

export class CheckoutDto {
  @ArrayMinSize(1)
  cart: CartItem[];
}

class CartItem {
  @IsInt()
  @Min(1)
  productId: number;

  @IsInt()
  @Min(1)
  qty: number;
}
