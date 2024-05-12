import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
  Get,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { RolesGuard } from '../auth/guards';
import { Role } from '@prisma/client';
import { DeleteManyDto, FindManyDto } from '../common/dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(RolesGuard(Role.Admin))
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoriesService.create(createCategoryDto);
    return {
      success: true,
      data: newCategory,
    };
  }

  @Get()
  async findRootCategories(@Query() findManyDto: FindManyDto) {
    const { count, categories, parents } =
      await this.categoriesService.findBySlug(findManyDto);
    return { success: true, count, data: { categories, parents } };
  }

  @Get(':slug/subs')
  async findBySlug(
    @Query() findManyDto: FindManyDto,
    @Param('slug') slug: string,
  ) {
    const { count, categories, parents } =
      await this.categoriesService.findBySlug(findManyDto, slug);
    return { success: true, count, data: { categories, parents } };
  }

  @Get('tree')
  async findCategoriesTree() {
    const categories = await this.categoriesService.findCategoriesTree();
    return { success: true, categories };
  }

  @Patch(':id')
  @UseGuards(RolesGuard(Role.Admin))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updatedCategory = await this.categoriesService.update(
      id,
      updateCategoryDto,
    );
    return {
      success: true,
      data: updatedCategory,
    };
  }

  @Delete()
  @UseGuards(RolesGuard(Role.Admin))
  async remove(@Query() { ids }: DeleteManyDto) {
    await this.categoriesService.remove(ids);
    return { success: true };
  }
}
