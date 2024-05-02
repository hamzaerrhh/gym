import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export function createCotch() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export function createProducts() {
  return {
    productId: faker.string.uuid(),
    name: faker.internet.userName(),
    image: faker.image.avatar(),
    prix: faker.number.float({ min: 1, max: 99999 }),
    timeAdd: faker.date.past(),
    favorite: faker.number.int({ min: 1, max: 99999 }),
    demande: faker.number.int({ min: 1, max: 99999 }),
  };
}

export const PRODUCTS = faker.helpers.multiple(createProducts, {
  count: 30,
});

export default { PRODUCTS };
