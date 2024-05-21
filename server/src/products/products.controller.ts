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
import {
  CreateProductDto,
  DeleteImagesDto,
  FindManyProductsDto,
  FindManyStoreProductsDto,
  FindRelatedProductsDto,
  UpdateProductDto,
} from './dto';
import { DeleteManyDto } from '../common/dto';
import { Role, Status } from '@prisma/client';
import { RolesGuard } from '../auth/guards';
import { FilesInterceptor } from '@nestjs/platform-express';
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
  @UseGuards(RolesGuard(Role.Admin))
  async findAll(@Query() findManyProductsDto: FindManyProductsDto) {
    const products = await this.productsService.findAll(findManyProductsDto);
    return { success: true, data: products };
  }

  @Get('category/:slug')
  @UseGuards(RolesGuard(Role.Admin))
  async findAllBySlug(
    @Query() findManyProductsDto: FindManyProductsDto,
    @Param('slug') slug: string,
  ) {
    const products = await this.productsService.findAll(
      findManyProductsDto,
      slug,
    );
    return { success: true, data: products };
  }

  @Get('store')
  async findAllInStore(@Query() dto: FindManyStoreProductsDto) {
    const products = await this.productsService.findAll({
      ...dto,
      status: Status.Active,
    });

    return {
      success: true,
      data: products,
    };
  }

  @Get('store/paginate')
  async paginateStore(@Query() dto: FindManyStoreProductsDto) {
    const count = await this.productsService.paginate({
      ...dto,
      status: Status.Active,
    });
    return { success: true, count };
  }

  @Get('store/paginate/category/:slug')
  async paginateStoreByCategorySlug(
    @Query() dto: FindManyStoreProductsDto,
    @Param('slug') slug: string,
  ) {
    const count = await this.productsService.paginate(
      { ...dto, status: Status.Active },
      slug,
    );
    return { success: true, count };
  }

  @Get('paginate')
  @UseGuards(RolesGuard(Role.Admin))
  async paginate(@Query() dto: FindManyProductsDto) {
    const count = await this.productsService.paginate(dto);
    return { success: true, count };
  }

  @Get('paginate/category/:slug')
  @UseGuards(RolesGuard(Role.Admin))
  async paginateByCategorySlug(
    @Query() dto: FindManyProductsDto,
    @Param('slug') slug: string,
  ) {
    const count = await this.productsService.paginate(dto, slug);
    return { success: true, count };
  }

  @Get('recommend')
  async recommend(@Query() { refIds }: FindRelatedProductsDto) {
    const recommendedProducts = await this.productsService.recommend(refIds);
    return { success: true, data: recommendedProducts };
  }

  @Get('store/category/:slug')
  async findAllBySlugInStore(
    @Query() dto: FindManyStoreProductsDto,
    @Param('slug') slug: string,
  ) {
    const products = await this.productsService.findAll(
      { ...dto, status: Status.Active },
      slug,
    );
    return { success: true, data: products };
  }

  @Get('details/:slug')
  async findOne(@Param('slug') slug: string) {
    const product = await this.productsService.findBySlug(slug);
    return { success: true, data: product };
  }

  @Get('search/:term')
  async search(@Param('term') term: string) {
    const products = await this.productsService.search(term);
    return { success: true, data: products };
  }

  @Patch(':id/upload-images')
  @UseGuards(RolesGuard(Role.Admin))
  @UseInterceptors(FilesInterceptor('images', 4))
  async uploadImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles(
      new ParseFilePipe({
        validators: imageValidators,
      }),
    )
    files: Express.Multer.File[],
  ) {
    await this.productsService.uploadProductImages(
      id,
      files.map((file) => ({
        buffer: file.buffer,
        filename: file.originalname,
      })),
    );
    return { success: true };
  }

  @Get('aggregate')
  @UseGuards(RolesGuard(Role.Admin))
  async aggregateProducts(@Query() dto: FindManyProductsDto) {
    const inStockGroups = await this.productsService.aggregate('inStock', dto);
    const statusGroups = await this.productsService.aggregate('status', dto);

    return { inStockGroups, statusGroups, success: true };
  }

  @Get('aggregate/:slug')
  @UseGuards(RolesGuard(Role.Admin))
  async aggregateProductsBySlug(
    @Query() dto: FindManyProductsDto,
    @Param('slug') slug,
  ) {
    const inStockGroups = await this.productsService.aggregate(
      'inStock',
      dto,
      slug,
    );
    const statusGroups = await this.productsService.aggregate(
      'status',
      dto,
      slug,
    );

    return { inStockGroups, statusGroups, success: true };
  }

  @Delete(':productId/remove-images')
  @UseGuards(RolesGuard(Role.Admin))
  async removeImage(
    @Param('productId', ParseIntPipe) productId: number,
    @Query() { ids: imageIds }: DeleteImagesDto,
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
