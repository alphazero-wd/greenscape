import { Request } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';
import { CookieAuthGuard, LocalAuthGuard } from './guards';
import { CurrentUser } from '../users/decorators';
import { User } from '@prisma/client';
import { TransformDataInterceptor } from '../common/interceptors';
import { AuthResponse } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(new TransformDataInterceptor(AuthResponse))
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.register(createUserDto);
    return { success: true, data: newUser };
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(new TransformDataInterceptor(AuthResponse))
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@CurrentUser() user: User) {
    return {
      success: true,
      data: user,
    };
  }

  @Get('me')
  @UseGuards(CookieAuthGuard)
  @UseInterceptors(new TransformDataInterceptor(AuthResponse))
  me(@CurrentUser() user: User) {
    return {
      success: true,
      data: user,
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(CookieAuthGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    req.logOut(() => {});
    req.session.cookie.maxAge = 0;
    return { success: true };
  }
}
