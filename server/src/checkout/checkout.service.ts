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
import { OrdersService } from '../orders/orders.service';
import { shippingOptions } from './utils';
import { allowedCountries } from '../common/utils';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CheckoutService implements OnModuleInit {
  stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private ordersService: OrdersService,
    private productsService: ProductsService,
  ) {}

  onModuleInit() {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-08-16',
    });
  }

  async constructEventFromPayload(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
      const productIds = session.metadata.cartItemIds
        .split(',')
        .map((id) => +id);
      const quantities = session.metadata.quantities
        .split(',')
        .map((id) => +id);
      const { city, country, postal_code, state, line1, line2 } =
        session.customer_details.address;
      await this.ordersService.create({
        id: session.payment_intent.toString().split('_')[1],
        line1,
        line2,
        state,
        country,
        city,
        postalCode: postal_code,
        total: +(session.amount_total / 100).toFixed(2),
        phone: session.customer_details.phone,
        email: session.customer_details.email,
        cart: productIds.map((id, index) => ({
          productId: id,
          qty: quantities[index],
        })),
        customer: session.customer_details.name,
        shippingCost: +(session.shipping_cost.amount_total / 100).toFixed(2),
      });
      for (let index in productIds) {
        const product = await this.productsService.findOne(productIds[index]);
        await this.productsService.update(product.id, {
          inStock: product.inStock - quantities[index],
        });
      }
    }
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
          product_data: {
            name: item.name,
            images: item.images.map(
              (image) =>
                `${this.configService.get('SERVER_URL')}/files/${image.id}`,
            ),
          },
          unit_amount: +(+item.price.toFixed(2) * 100).toFixed(2),
        },
      });
    });

    const session = await this.stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: allowedCountries,
      },
      shipping_options: shippingOptions,
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
      metadata: {
        cartItemIds: cartItemIds.join(','),
        quantities: cartItemQuantities.join(','),
      },
    });

    return { checkoutUrl: session.url };
  }
}
