import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VariationsService } from './variations.service';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';

@Controller('variations')
export class VariationsController {
  constructor(private readonly variationsService: VariationsService) {}

  @Post()
  create(@Body() createVariationDto: CreateVariationDto) {
    return this.variationsService.create(createVariationDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVariationDto: UpdateVariationDto,
  ) {
    return this.variationsService.update(id, updateVariationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.variationsService.remove(id);
  }
}
