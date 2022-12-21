import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AccountModule } from '../account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwt/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [AccountModule, JwtModule.register(jwtConfig), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
