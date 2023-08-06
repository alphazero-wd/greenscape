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
  Res,
  ParseIntPipe,
  StreamableFile,
  UseInterceptors,
  Query,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { BillboardsService } from './billboards.service';
import { RolesGuard } from '../auth/guards';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageValidators } from '../files/validators';
import { DeleteManyDto } from '../common/dto';
import { MAX_IMAGE_SIZE } from '../common/constants';
import { diskStorage } from 'multer';
import {
  CreateBillboardDto,
  FindBillboardsDto,
  UpdateBillboardDto,
} from './dto';

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
  create(
    @Body() createBillboardDto: CreateBillboardDto,
    @UploadedFile(new ParseFilePipe({ validators: imageValidators }))
    image: Express.Multer.File,
  ) {
    return this.billboardsService.create(createBillboardDto, {
      filename: image.filename,
      mimetype: image.mimetype,
      path: image.path,
    });
  }

  @Get()
  findAll(@Query() { featured }: FindBillboardsDto) {
    return this.billboardsService.findAll(
      featured ? { isFeatured: true } : undefined,
    );
  }

  @Patch(':id')
  @UseGuards(RolesGuard(Role.Admin))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBillboardDto: UpdateBillboardDto,
  ) {
    return this.billboardsService.update(id, updateBillboardDto);
  }

  @Delete()
  @UseGuards(RolesGuard(Role.Admin))
  remove(@Query() { ids }: DeleteManyDto) {
    const idsList = ids.split(',').map((id) => +id);
    return this.billboardsService.remove(idsList);
  }
}
