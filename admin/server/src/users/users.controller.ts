import {
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../auth/guards';
import { Role } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch(':id')
  @UseGuards(RolesGuard(Role.Admin))
  async makeAdmin(@Param('id', ParseIntPipe) userId: number) {
    const admin = await this.usersService.update(userId, {
      roles: ['Admin', 'User'],
    });
    return {
      success: true,
      data: admin,
    };
  }
}
