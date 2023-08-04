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
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { DeleteManyDto } from '../common/dto';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  async create(@Body() createSizeDto: CreateSizeDto) {
    const newSize = await this.sizesService.create(createSizeDto);
    return { success: true, data: newSize };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSizeDto: UpdateSizeDto,
  ) {
    const updatedSize = await this.sizesService.update(id, updateSizeDto);
    return { success: true, data: updatedSize };
  }

  @Delete()
  async remove(@Query() { ids }: DeleteManyDto) {
    const idsList = ids.split(',').map((id) => +id);
    await this.sizesService.remove(idsList);
    return { success: true };
  }
}
