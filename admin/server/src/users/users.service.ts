import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PRISMA_UNIQUE_VIOLATION_ERROR_CODE } from '../common/constants';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: createUserDto,
      });
      return newUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PRISMA_UNIQUE_VIOLATION_ERROR_CODE)
          throw new BadRequestException({
            success: false,
            message: 'User with that email already exists',
          });
      } else
        throw new InternalServerErrorException({
          success: false,
          message: `[USER_CREATION_ERROR] - ${error.message}`,
        });
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
