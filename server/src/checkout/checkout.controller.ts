import {
  Body,
  Controller,
  ForbiddenException,
  Header,
  Headers,
  Post,
  Req,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto';
import { ReqWithRawBody } from '../common/interfaces';

@Controller()
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('checkout')
  async checkout(@Body() checkoutDto: CheckoutDto) {
    const { checkoutUrl } = await this.checkoutService.checkout(checkoutDto);
    return { success: true, checkoutUrl };
  }

  @Post('webhook')
  async handleAfterPayment(
    @Headers('stripe-signature') signature: string,
    @Req() req: ReqWithRawBody,
  ) {
    if (!signature)
      throw new ForbiddenException({
        success: false,
        message: 'Missing stripe-signature header',
      });
    await this.checkoutService.constructEventFromPayload(
      signature,
      req.rawBody,
    );
    return { success: true };
  }
}
