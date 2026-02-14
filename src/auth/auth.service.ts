import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prismaService: PrismaService;

  @Inject()
  private readonly jwtService: JwtService;

  async signin(params: Prisma.UsersCreateInput): Promise<{ access_token: string }> {
    const user = await this.prismaService.users.findUnique({ where: { email: params.email } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    const isPasswordValid = await bcrypt.compare(params.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Senha inválida');

    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
