import mongoose from 'mongoose';
import { fakerES_MX as faker } from '@faker-js/faker';

export const mockUser = ({ hash }) => {
  return {
    _id: new mongoose.Types.ObjectId(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: hash,
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: []
  };
};

export const mockPet = () => {
  return {
    _id: new mongoose.Types.ObjectId(),
    name: faker.animal.petName(),
    specie: faker.helpers.arrayElement(['perro','gato','carpincho','cobayo','loro','conejo','pez','hornero','tortuga']),
    birthDate: faker.date.between({ from: '2008-01-01', to: new Date() }),
    adopted: false,
    owner: null,
    image: faker.image.urlLoremFlickr({ category: 'animals', width: 300, height: 300 })
  };
};

export const mockMany = (count, factory) => {
  const n = Number.isFinite(+count) && +count > 0 ? +count : 50;
  return Array.from({ length: n }, () => factory());
};
