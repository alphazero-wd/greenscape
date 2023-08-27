import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  ParseFilePipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, FindManyProductsDto, UpdateProductDto } from './dto';
import { DeleteManyDto } from '../common/dto';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageValidators } from '../files/validators';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(RolesGuard(Role.Admin))
  async create(@Body() createProductDto: CreateProductDto) {
    const newProduct = await this.productsService.create(createProductDto);
    return { success: true, data: newProduct };
  }

  @Get()
  async findAll(@Query() findManyProductsDto: FindManyProductsDto) {
    const {
      products,
      count,
      statusGroups,
      inStockGroups,
      categoryGroups,
      priceRange,
    } = await this.productsService.findAll(findManyProductsDto);
    return {
      success: true,
      data: products,
      count,
      statusGroups,
      categoryGroups,
      inStockGroups,
      priceRange,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    return { success: true, data: product };
  }

  @Patch(':id/upload-images')
  @UseGuards(RolesGuard(Role.Admin))
  @UseInterceptors(
    FilesInterceptor('images', Infinity, {
      storage: diskStorage({ destination: './uploads/products' }),
    }),
  )
  async uploadImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles(
      new ParseFilePipe({
        validators: imageValidators,
      }),
    )
    files: Express.Multer.File[],
  ) {
    await this.productsService.uploadImages(
      id,
      files.map((file) => ({
        filename: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
      })),
    );
    return { success: true };
  }

  @Delete(':productId/remove-images')
  @UseGuards(RolesGuard(Role.Admin))
  async removeImage(
    @Param('productId', ParseIntPipe) productId: number,
    @Query() { ids: imageIds }: DeleteManyDto,
  ) {
    await this.productsService.removeImages(productId, imageIds);
    return { success: true };
  }

  @Patch(':id')
  @UseGuards(RolesGuard(Role.Admin))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productsService.update(
      id,
      updateProductDto,
    );
    return { success: true, data: updatedProduct };
  }

  @Delete()
  @UseGuards(RolesGuard(Role.Admin))
  async remove(@Query() { ids }: DeleteManyDto) {
    await this.productsService.remove(ids);
    return { success: true };
  }
}
