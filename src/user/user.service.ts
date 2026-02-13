import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, Users } from 'src/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';


@Injectable()
export class UserService {
  @Inject()
  private readonly prismaService: PrismaService;

  async user (where: Prisma.UsersWhereUniqueInput): Promise<Users | null> {
    return this.prismaService.users.findUnique({
      where,
    });
  }

  async createUser(data: Prisma.UsersCreateInput) {
    const hashPassword = await bcrypt.hash(data.password, 10);
    return this.prismaService.users.create({
      data: {
        ...data,
        password: hashPassword,
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }): Promise<Users> {
    const { where, data } = params;
    return this.prismaService.users.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return this.prismaService.users.delete({
      where,
    });
  }
}
