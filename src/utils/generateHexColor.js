import { faker } from '@faker-js/faker';

export const generateHexColor = () => {
    return faker.color.rgb();
};
