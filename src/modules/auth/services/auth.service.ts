import { HttpStatus, Injectable } from '@nestjs/common';
import { IAuthService } from './IAuthService';
import { LoginDto } from '../dtos/request/login.dto';
import { LoginResponseDto } from '../dtos/response/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { ErrorCode, ErrorMessage } from '../../../app/constants/error.constant';
import { RegisterDto } from '../dtos/request/register.dto';
import { AccountDto } from '../../account/dtos/response/account.dto';
import { AccountService } from '../../account/services/account.service';
import { comparePasswordHash } from '../../../app/utils/password.util';
import { CustomException } from '../../../common/shared/exceptions/custom.exception';
import { AccountRole } from '../../account/utils/account.enum';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async doLogin(dto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = dto;
    const exist = await this.accountService.getAccountEntityByEmail(email);

    const isPasswordValid = await comparePasswordHash(password, exist.password);
    if (!isPasswordValid)
      throw new CustomException(HttpStatus.UNAUTHORIZED, {
        code: ErrorCode.INVALID_EMAIL_OR_PASSWORD,
        message: ErrorMessage.INVALID_EMAIL_OR_PASSWORD,
      });

    return {
      accessToken: this.jwtService.sign({ accountId: exist._id }),
    };
  }

  doRegister(dto: RegisterDto): Promise<AccountDto> {
    return this.accountService.createAccount({
      email: dto.email,
      password: dto.password,
      roles: [AccountRole.USER],
    });
  }
}