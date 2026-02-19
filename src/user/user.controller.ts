import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/auth/auth.guard';
import { Users as UsersModel } from 'src/generated/prisma/client';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(
    @Body(new ValidationPipe()) userData: CreateUserDto,
  ): Promise<UsersModel> {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<Omit<UsersModel, 'password'> | null> {
    return this.userService.user({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) userData: UpdateUserDto): Promise<UsersModel> {
    return this.userService.updateUser({
      where: { id },
      data: userData,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UsersModel> {
    return this.userService.deleteUser({ id });
  }
}