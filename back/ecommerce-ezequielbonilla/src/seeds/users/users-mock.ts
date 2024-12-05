import { Role } from 'src/shared/enums/roles.enum';

export const usersMock = [
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'Pass1234!',
    address: 'Calle 123',
    phone: 12345678,
    country: 'Argentina',
    city: 'Capital Federal',
    accessLevel: Role.Admin,
  },
  {
    name: 'Regular User',
    email: 'user@test.com',
    password: 'Pass1234!',
    address: 'Calle 123',
    phone: 12345678,
    country: 'Userland',
    city: 'Capital Federal',
    accessLevel: Role.User,
  },
];
