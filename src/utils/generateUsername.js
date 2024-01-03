import { faker } from '@faker-js/faker';

export const generateUsername = () => {
    return faker.internet.userName();
};
