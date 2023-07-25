import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.register(createUserDto);
    delete newUser.password;
    return {
      success: true,
      data: newUser,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login() {}

  @Get('me')
  me() {}

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout() {}
}
