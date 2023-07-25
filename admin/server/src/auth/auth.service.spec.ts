import * as argon2 from 'argon2';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto';
import { Prisma, User } from '@prisma/client';
import { createRandomUser } from '../common/__mocks__';
import { PrismaError } from '../prisma/prisma-error';

jest.mock('argon2');
describe('AuthService', () => {
  let authService: AuthService;
  let prisma: PrismaService;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    user = createRandomUser();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    let createUserDto: CreateUserDto;
    let hashedPassword: string;
    beforeEach(() => {
      createUserDto = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      };
      hashedPassword = 'hashedPassword';
      (argon2.hash as jest.Mock).mockResolvedValueOnce(hashedPassword);
    });
    it('should throw an error when creating an account with the email that already exists', async () => {
      jest.spyOn(prisma.user, 'create').mockRejectedValueOnce(
        new Prisma.PrismaClientKnownRequestError('Email already exists', {
          code: PrismaError.UniqueViolation,
          clientVersion: '5.0.0',
        }),
      );

      await expect(authService.register(createUserDto)).rejects.toThrowError(
        'User with that email already exists',
      );
    });

    it('should throw an error when there is something wrong on the server', async () => {
      jest
        .spyOn(prisma.user, 'create')
        .mockRejectedValueOnce(new Error('Something went wrong'));

      await expect(authService.register(createUserDto)).rejects.toThrowError(
        'Something went wrong',
      );
    });

    it('should create a new user', async () => {
      jest
        .spyOn(prisma.user, 'create')
        .mockResolvedValueOnce({ ...user, password: hashedPassword });
      const result = await authService.register(createUserDto);
      expect(result).toEqual({ ...user, password: hashedPassword });
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
    });
  });

  describe('login', () => {
    it('should throw an error when user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(undefined);
      await expect(
        authService.login(user.email, user.password),
      ).rejects.toThrowError('Wrong username or password provided');
    });

    it('should throw an error when password is wrong', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
      (argon2.verify as jest.Mock).mockResolvedValue(false);
      await expect(
        authService.login(user.email, user.password),
      ).rejects.toThrowError('Wrong username or password provided');
    });

    it('should log in successfully', async () => {
      jest
        .spyOn(prisma.user, 'findUnique')
        .mockResolvedValue({ ...user, password: 'hashedPassword' });
      (argon2.verify as jest.Mock).mockResolvedValue(true);
      const result = await authService.login(user.email, user.password);
      expect(result).toEqual({ ...user, password: 'hashedPassword' });
      expect(argon2.verify).toHaveBeenCalledWith(
        'hashedPassword',
        user.password,
      );
    });
  });
});
