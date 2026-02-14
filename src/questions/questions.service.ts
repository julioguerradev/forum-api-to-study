import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Questions } from 'src/generated/prisma/client';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {

  @Inject()
  private readonly prismaService: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, userId: number): Promise<Questions> {
    return await this.prismaService.questions.create({
      data: { ...createQuestionDto, userId },
    });
  }

  async findAll() {
    return await this.prismaService.questions.findMany({
      include: { 
        answers: {
          select: { body: true },
        }, 
        user: {
          select: { name: true, email: true }
        }
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.questions.findUniqueOrThrow({
      where: { id },
      include: { 
        answers: {
          select: { body: true },
        }, 
        user: {
          select: { name: true, email: true }
        }
      },
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prismaService.questions.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.questions.delete({
      where: { id },
    });
  }
}
