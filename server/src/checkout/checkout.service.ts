import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutDto } from './dto';

@Injectable()
export class CheckoutService implements OnModuleInit {
  stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  onModuleInit() {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-08-16',
    });
  }

  async checkout({ cart }: CheckoutDto) {
    const cartItemIds = cart.map((item) => item.productId);
    const cartItemQuantities = cart.map((item) => item.qty);
    const products = await this.prisma.product.findMany({
      where: { id: { in: cartItemIds } },
      include: {
        images: { take: 1, orderBy: { id: 'asc' }, select: { id: true } },
      },
    });
    if (products.length !== cartItemIds.length)
      throw new NotFoundException({
        success: false,
        message: 'Cannot find some products in cart',
      });
    if (
      cart.some(
        (item, i) =>
          item.qty <= 0 ||
          item.qty > products.find((p) => p.id === cartItemIds[i]).inStock,
      )
    )
      throw new BadRequestException({
        success: false,
        message:
          "Quantity must be positive and less than or equal to what's in stock",
      });

    const cartItemsWithProducts = cartItemQuantities.map((qty, i) => ({
      qty,
      ...products.find((p) => p.id === cartItemIds[i]),
    }));
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    cartItemsWithProducts.forEach((item) => {
      lineItems.push({
        quantity: item.qty,
        price_data: {
          currency: 'USD',
          tax_behavior: 'exclusive',
          product_data: {
            name: item.name,
            description: item.desc.slice(0, 201) + '...',
            images: item.images.map(
              (image) => `http://localhost:5000/files/${image.id}`,
            ),
          },
          unit_amount: +(+item.price.toFixed(2) * 100).toFixed(2),
        },
      });
    });

    const session = await this.stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      success_url: `${this.configService.get(
        'CORS_ORIGIN_STORE',
      )}/cart?success=1`,
      cancel_url: `${this.configService.get(
        'CORS_ORIGIN_STORE',
      )}/cart?cancelled=1`,
    });

    return { checkoutUrl: session.url };
  }
}
