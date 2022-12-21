import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_STRATEGY_KEY } from '../utils/auth.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY_KEY) {}
