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
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { RolesGuard } from '../auth/guards';
import { CurrentUser } from '../users/decorators';
import { Role, User } from '@prisma/client';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @UseGuards(RolesGuard(Role.Admin))
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @CurrentUser() user: User,
  ) {
    const newStore = await this.storesService.create(createStoreDto, user.id);
    return { success: true, data: newStore };
  }

  @Get()
  async findAll() {
    const stores = await this.storesService.findAll();
    return { success: true, data: stores };
  }

  @Get(':id')
  @UseGuards(RolesGuard(Role.Admin))
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    const store = await this.storesService.findOne(id, user.id);
    return { success: true, data: store };
  }

  @Patch(':id')
  @UseGuards(RolesGuard(Role.Admin))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoreDto: UpdateStoreDto,
    @CurrentUser() user: User,
  ) {
    const updatedStore = await this.storesService.update(
      id,
      updateStoreDto,
      user.id,
    );
    return { success: true, data: updatedStore };
  }

  @Delete(':id')
  @UseGuards(RolesGuard(Role.Admin))
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    await this.storesService.remove(id, user.id);
    return { success: true };
  }
}
