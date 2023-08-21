import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SizesModule } from '../sizes/sizes.module';

@Module({
  imports: [SizesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
