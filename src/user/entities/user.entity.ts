import { Users } from 'src/generated/prisma/client';

export class User implements Users {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}