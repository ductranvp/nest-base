import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { IAccountEntity } from '../../entities/IAccountEntity';
import { ApiProperty } from '@nestjs/swagger';
import { OmitBaseFields } from '../../../../common/base/entities/IBaseEntity';
import { AccountRole } from '../../utils/account.enum';

export class AccountCreateDto implements Omit<IAccountEntity, OmitBaseFields> {
  @ApiProperty({
    example: 'example@domain.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @ApiProperty({
    enum: AccountRole,
    isArray: true,
  })
  @IsEnum(AccountRole, { each: true })
  roles: AccountRole[];
}
