import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
  Get,
} from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { DeleteManyDto, FindManyDto } from '../common/dto';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guards';

@Controller('sizes')
@UseGuards(RolesGuard(Role.Admin))
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  async create(@Body() createSizeDto: CreateSizeDto) {
    const newSize = await this.sizesService.create(createSizeDto);
    return { success: true, data: newSize };
  }

  @Get()
  async findAll(@Query() findManyDto: FindManyDto) {
    const { count, sizes } = await this.sizesService.findAll(findManyDto);
    return { success: true, count, data: sizes };
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
    await this.sizesService.remove(ids);
    return { success: true };
  }
}
