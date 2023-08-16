import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, FindManyProductsDto, UpdateProductDto } from './dto';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards';
import { DeleteManyDto } from '../common/dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(RolesGuard(Role.Admin))
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() findManyDto: FindManyProductsDto) {
    return this.productsService.findAll(findManyDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard(Role.Admin))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete()
  @UseGuards(RolesGuard(Role.Admin))
  remove(@Query() { ids }: DeleteManyDto) {
    return this.productsService.remove(ids);
  }
}
