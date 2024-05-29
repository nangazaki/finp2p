import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/app/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/helpers/jwt.helper';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      privateKey: JWT.SECRET_KEY,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
