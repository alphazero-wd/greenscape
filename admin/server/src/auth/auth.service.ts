import * as argon2 from 'argon2';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto';
import { Prisma } from '@prisma/client';
import { PrismaError } from '../prisma/prisma-error';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register({ password, ...createUserDto }: CreateUserDto) {
    try {
      const hashedPassword = await argon2.hash(password);
      const user = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaError.UniqueViolation)
          throw new BadRequestException({
            success: false,
            message: 'User with that email already exists',
          });
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong',
      });
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      await this.verifyPassword(user.password, password);
      return user;
    } catch (error) {
      // for security reasons
      throw new BadRequestException({
        success: false,
        message: 'Wrong username or password provided',
      });
    }
  }

  private async verifyPassword(hashed: string, plain: string) {
    const isCorrectPassword = await argon2.verify(hashed, plain);
    if (!isCorrectPassword) throw new BadRequestException();
  }
}
