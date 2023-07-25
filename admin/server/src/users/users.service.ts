import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

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
