import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { DeleteManyDto, FindManyDto } from '../common/dto';
import { RolesGuard } from '../auth/guards';
import { Role } from '@prisma/client';
import { CreateColorDto, UpdateColorDto } from './dto';

@Controller('colors')
@UseGuards(RolesGuard(Role.Admin))
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  async create(@Body() createColorDto: CreateColorDto) {
    const newColor = await this.colorsService.create(createColorDto);
    return { success: true, data: newColor };
  }

  @Get()
  async findAll(@Query() findManyDto: FindManyDto) {
    const { count, colors } = await this.colorsService.findAll(findManyDto);
    return { success: true, count, data: colors };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    const updatedColor = await this.colorsService.update(id, updateColorDto);
    return { success: true, data: updatedColor };
  }

  @Delete()
  async remove(@Query() { ids }: DeleteManyDto) {
    await this.colorsService.remove(ids);
    return { success: true };
  }
}
