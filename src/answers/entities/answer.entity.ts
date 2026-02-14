import { Answers } from 'src/generated/prisma/client';
import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/user/entities/user.entity';

export class Answer implements Answers {
  id: number;
  body: string;
  user: User;
  userId: number;
  question: Question;
  questionId: number;
  createdAt: Date;
  updatedAt: Date;
}