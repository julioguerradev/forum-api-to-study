import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {

  @Inject()
  private readonly prismaService: PrismaService;

  async create(createAnswerDto: CreateAnswerDto, userId: number, questionId: number) {
    return await this.prismaService.answers.create({
      data: { ...createAnswerDto, userId, questionId},
    });
  }

  async findAll() {
    return await this.prismaService.answers.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.answers.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return await this.prismaService.answers.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.answers.delete({
      where: { id },
    });
  }
}
