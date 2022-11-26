import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dtos/request/create-account.dto';
import { AccountMapper } from './account.mapper';
import { IAccountService } from './interfaces/IAccountService';
import { AccountDto } from './dtos/response/account.dto';
import { UpdateAccountDto } from './dtos/request/update-account.dto';
import { AccountRepository } from './account.repository';
import { PageAccountDto } from './dtos/response/page-account.dto';
import { ErrorCode, ErrorMessage } from '../../constants/error.constant';
import { CustomException, hashPassword } from '@node-collection/nest-ready';
import { PageRequestDto } from '../shared/dtos/page-request.dto';

@Injectable()
export class AccountService implements IAccountService {
  constructor(private readonly repo: AccountRepository) {}

  async createAccount(dto: CreateAccountDto): Promise<AccountDto> {
    const prepareEntity = AccountMapper.createDtoToEntity(dto);
    prepareEntity.password = await hashPassword(prepareEntity.password);
    const created = await this.repo.createOne(prepareEntity);
    return AccountMapper.entityToDto(created);
  }

  async getAccountById(id: string): Promise<AccountDto> {
    const exist = await this.repo.getOne({ id });
    if (!exist)
      throw new CustomException(HttpStatus.NOT_FOUND, {
        code: ErrorCode.ACCOUNT_NOT_FOUND,
        message: ErrorMessage.ACCOUNT_NOT_FOUND,
      });
    return AccountMapper.entityToDto(exist);
  }

  async getAccountByEmail(email: string): Promise<AccountDto> {
    const exist = await this.repo.getOne({ email });
    if (!exist)
      throw new CustomException(HttpStatus.NOT_FOUND, {
        code: ErrorCode.ACCOUNT_NOT_FOUND,
        message: ErrorMessage.ACCOUNT_NOT_FOUND,
      });
    return AccountMapper.entityToDto(exist);
  }

  async updateAccount(id: string, dto: UpdateAccountDto): Promise<AccountDto> {
    await this.getAccountById(id);
    if (dto.password) dto.password = await hashPassword(dto.password);
    await this.repo.updateOne({ id }, dto);
    return this.getAccountById(id);
  }

  async deleteAccount(id: string): Promise<boolean> {
    await this.getAccountById(id);
    return this.repo.deleteOne({ id }, true);
  }

  async getAccounts(query: PageRequestDto): Promise<PageAccountDto> {
    const result = await this.repo.getMany(query);
    return AccountMapper.pageEntityToPageDto(result);
  }
}
