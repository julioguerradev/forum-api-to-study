import { Questions } from 'src/generated/prisma/client';
import { User } from 'src/user/entities/user.entity';

export class Question implements Questions {
  id: number;
  title: string;
  body: string;
  user: User;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}