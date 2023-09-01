import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  async checkout(@Body() checkoutDto: CheckoutDto) {
    const { checkoutUrl } = await this.checkoutService.checkout(checkoutDto);
    return { success: true, checkoutUrl };
  }
}
