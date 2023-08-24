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

  // categories will be displayed on the store so don't apply guard to this endpoint
  @Get()
  async findAll(@Query() findManyDto: FindManyDto) {
    const { count, categories } = await this.categoriesService.findAll(
      findManyDto,
    );
    return { success: true, count, data: categories };
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
