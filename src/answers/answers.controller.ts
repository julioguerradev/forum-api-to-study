import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
export class AnswersController {
  @Inject()
  private readonly answersService: AnswersService;

  @Post(':questionId')
  @UseGuards(AuthGuard)
  create(
    @Body() createAnswerDto: CreateAnswerDto, 
    @Request() req: any,
    @Param('questionId') questionId: string
  ) {
    return this.answersService.create(createAnswerDto, req.user.sub, +questionId);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.answersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.answersService.remove(id);
  }
}
