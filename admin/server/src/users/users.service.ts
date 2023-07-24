import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PRISMA_UNIQUE_VIOLATION_ERROR_CODE } from '../common/constants';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) return user;
    throw new BadRequestException({
      success: false,
      message: 'User with that email does not exist',
    });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
