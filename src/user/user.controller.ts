import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from 'src/auth/auth.guard';
import { Prisma, Users as UsersModel } from 'src/generated/prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(
    @Body() userData: Prisma.UsersCreateInput,
  ): Promise<UsersModel> {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UsersModel | null> {
    return this.userService.user({ id: Number(id) });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() userData: Prisma.UsersUpdateInput): Promise<UsersModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UsersModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}