import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrdersModule } from './orders/orders.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),
        CORS_ORIGIN_ADMIN: Joi.string().required(),
        CORS_ORIGIN_STORE: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
        STRIPE_WEBHOOK_SECRET: Joi.string().required(),
        AWS_BUCKET_NAME: Joi.string().required(),
        AWS_OBJECT_DEST: Joi.string().required(),
        AWS_ACCOUNT_ID: Joi.string().required(),
        COOKIE_DOMAIN: Joi.string().required()
      }),
    }),
    CategoriesModule,
    FilesModule,
    ProductsModule,
    CheckoutModule,
    OrdersModule,
    MetricsModule,
  ],
})
export class AppModule {}
