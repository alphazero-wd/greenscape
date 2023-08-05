import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { DeleteManyDto } from '../common/dto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  async create(@Body() createColorDto: CreateColorDto) {
    const newColor = await this.colorsService.create(createColorDto);
    return { success: true, data: newColor };
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
    const idsList = ids.split(',').map((id) => +id);
    await this.colorsService.remove(idsList);
    return { success: true };
  }
}
