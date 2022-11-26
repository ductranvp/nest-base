import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IAccountEntity } from '../../interfaces/IAccountEntity';
import { ApiProperty } from '@nestjs/swagger';
import { AccountRole } from '../../account.constant';
import { OmitBaseFields } from '@node-collection/nest-ready';

export class CreateAccountDto implements Omit<IAccountEntity, OmitBaseFields> {
  @ApiProperty({
    example: 'example@domain.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: AccountRole,
    isArray: true,
  })
  @IsEnum(AccountRole, { each: true })
  roles: AccountRole[];
}
