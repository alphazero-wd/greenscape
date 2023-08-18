import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VariantsService } from './variants.service';
import { CreateVariantDto, UpdateVariantDto } from './dto';

@Controller('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post()
  async create(@Body() createVariantDto: CreateVariantDto) {
    const newVariant = await this.variantsService.create(createVariantDto);
    return { data: newVariant, success: true };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    const updatedVariant = await this.variantsService.update(
      id,
      updateVariantDto,
    );
    return { data: updatedVariant, success: true };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.variantsService.remove(id);
    return { success: true };
  }
}
