import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';




@Module({
  imports: [ConfigModule, DatabaseModule, forwardRef(() => UserModule), JwtModule.registerAsync({
    inject: [ConfigService],
      global: true,
      useFactory: async (config: ConfigService) => ({
      secret: config.get('SECRET_KEY'),
      signOptions: { expiresIn: '1h' },
      }),
    })
  ],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
