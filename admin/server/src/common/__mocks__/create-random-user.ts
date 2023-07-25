import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

export const createRandomUser = (): User => {
  return {
    id: 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: 'Abcd12345@#',
    updatedAt: faker.date.recent(),
    createdAt: faker.date.recent(),
  };
};
