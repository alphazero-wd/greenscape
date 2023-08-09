import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  Query,
  UploadedFile,
  ParseFilePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { BillboardsService } from './billboards.service';
import { RolesGuard } from '../auth/guards';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageValidators } from '../files/validators';
import { DeleteManyDto } from '../common/dto';
import { MAX_IMAGE_SIZE } from '../common/constants';
import { diskStorage } from 'multer';
import { CreateBillboardDto, UpdateBillboardDto } from './dto';

@Controller('billboards')
export class BillboardsController {
  constructor(private readonly billboardsService: BillboardsService) {}

  @Post()
  @UseGuards(RolesGuard(Role.Admin))
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({ destination: './uploads/billboards' }),
      limits: { fileSize: MAX_IMAGE_SIZE },
    }),
  )
  async create(
    @Body() createBillboardDto: CreateBillboardDto,
    @UploadedFile(new ParseFilePipe({ validators: imageValidators }))
    image: Express.Multer.File,
  ) {
    const newBillboard = await this.billboardsService.create(
      createBillboardDto,
      {
        filename: image.filename,
        mimetype: image.mimetype,
        path: image.path,
      },
    );
    return { success: true, data: newBillboard };
  }

  @Get()
  async findAll(@Query('featured', ParseBoolPipe) featured: boolean) {
    const billboards = await this.billboardsService.findAll(
      featured ? { isFeatured: true } : {},
    );
    return { success: true, data: billboards };
  }

  @Patch(':id')
  @UseGuards(RolesGuard(Role.Admin))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBillboardDto: UpdateBillboardDto,
  ) {
    const updatedBillboard = await this.billboardsService.update(
      id,
      updateBillboardDto,
    );
    return { success: true, data: updatedBillboard };
  }

  @Delete()
  @UseGuards(RolesGuard(Role.Admin))
  async remove(@Query() { ids }: DeleteManyDto) {
    const idsList = ids.split(',').map((id) => +id);
    await this.billboardsService.remove(idsList);
    return { success: true };
  }
}
