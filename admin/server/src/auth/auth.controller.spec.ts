import * as argon2 from 'argon2';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { CreateUserDto } from '../users/dto';
import { User } from '@prisma/client';
import { createRandomUser } from '../common/__mocks__';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

describe('AuthController', () => {
  let app: INestApplication;
  let user: User;
  let userResponse: User;
  let plainPassword: string;
  let prisma: PrismaService;
  let cookie: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, PrismaModule, UsersModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    prisma = moduleRef.get<PrismaService>(PrismaService);

    user = createRandomUser();
    plainPassword = user.password;
    userResponse = { ...user };
    delete userResponse.password;
    user.password = await argon2.hash(user.password);
  });

  afterAll(async () => {
    await prisma.clearDatabase();
    await app.close();
    await prisma.$disconnect();
  });

  describe('POST /auth/register', () => {
    let createUserDto: CreateUserDto;
    beforeEach(() => {
      createUserDto = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: plainPassword,
      };
    });
    it('should throw an error when data is invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          firstName: '',
          lastName: '',
          email: 'invalid-email',
          password: 'weakpassword',
        })
        .expect(400);
      expect(res.body.message.length).toBe(4);
    });
    it('should register successfully', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send(createUserDto)
        .expect(201);
      expect(res.body).toEqual({
        success: true,
        data: {
          ...userResponse,
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      });
    });
    it('should throw an error when account already exists', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/register')
        .send(createUserDto)
        .expect(400);
      expect(res.body).toEqual({
        success: false,
        message: 'User with that email already exists',
      });
    });
  });

  describe('POST /auth/login', () => {
    it('should throw an error when user does not exist', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'notfound@email.com',
          password: plainPassword,
        })
        .expect(400);
      expect(res.body).toEqual({
        success: false,
        message: 'Wrong email or password provided',
      });
    });

    it('should throw an error when password is wrong', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: user.email,
          password: 'wrongpassword',
        })
        .expect(400);
      expect(res.body).toEqual({
        success: false,
        message: 'Wrong email or password provided',
      });
    });

    it('should log in successfully with a cookie', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: user.email,
          password: plainPassword,
        })
        .expect(200);
      cookie = res.headers['set-cookie'];
      console.log({ cookie });
      expect(res.body).toEqual({
        success: false,
        data: {
          id: expect.any(Number),
          ...userResponse,
          createdAt: userResponse.createdAt.toISOString(),
          updatedAt: userResponse.updatedAt.toISOString(),
        },
      });
      expect(cookie).toBeDefined();
    });
  });

  describe('GET /auth/me', () => {
    it('should throw an error when no user is logged in', () => {
      return request(app.getHttpServer()).get('/auth/me').expect(401);
    });

    it('should return the current logged in user', async () => {
      const res = await request(app.getHttpServer())
        .get('/auth/me')
        .withCredentials(true)
        .end()
        .expect(200);
      expect(res.body).toEqual({
        success: true,
        data: {
          id: expect.any(Number),
          ...userResponse,
          createdAt: userResponse.createdAt.toISOString(),
          updatedAt: userResponse.updatedAt.toISOString(),
        },
      });
    });
  });

  describe('POST /auth/logout', () => {
    it('should throw an error when no user is logged in', () => {
      return request(app.getHttpServer()).post('/auth/logout').expect(401);
    });
    it('should log the user out', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/logout')
        .withCredentials(true)
        .expect(200);
      expect(res.body).toEqual({ success: true });
      expect(res.headers['set-cookies']).toBeUndefined();
    });
  });
});
