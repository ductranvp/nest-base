import { CACHE_MANAGER, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountCreateDto } from './dtos/request/account.create.dto';
import { AccountMapper } from './account.mapper';
import { IAccountService } from './interfaces/IAccountService';
import { AccountDto } from './dtos/response/account.dto';
import { AccountUpdateDto } from './dtos/request/account.update.dto';
import { AccountPageDto } from './dtos/response/account.page.dto';
import { ErrorCode, ErrorMessage } from '../../app/constants/error.constant';
import { PageRequestDto } from '../shared/dtos/page-request.dto';
import { Cache } from 'cache-manager';
import { AppEnv } from '../../app/constants/app.constant';
import { hashPassword } from '../../app/utils/password.util';
import { AccountRepository } from './repository/repositories/account.repository';
import { CustomException } from '../../common';
import { AccountEntity } from './repository/entities/account.entity';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    private readonly repo: AccountRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async createAccount(dto: AccountCreateDto): Promise<AccountDto> {
    const prepareEntity = AccountMapper.createDtoToEntity(dto);
    prepareEntity.password = await hashPassword(prepareEntity.password);
    const created = await this.repo.createOne(prepareEntity);
    return AccountMapper.entityToDto(created);
  }

  async getAccountById(_id: string): Promise<AccountDto> {
    const cached = await this.cacheService.get<AccountDto>(_id);
    if (cached) return cached;

    const exist = await this.repo.getOne({ _id: _id });
    if (!exist)
      throw new CustomException(HttpStatus.NOT_FOUND, {
        code: ErrorCode.ACCOUNT_NOT_FOUND,
        message: ErrorMessage.ACCOUNT_NOT_FOUND,
      });
    const result = AccountMapper.entityToDto(exist);

    this.cacheService.set(_id, result, { ttl: AppEnv.DEFAULT_CACHE_TTL });

    return result;
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

  async updateAccount(_id: string, dto: AccountUpdateDto): Promise<AccountDto> {
    await this.getAccountById(_id);
    if (dto.password) dto.password = await hashPassword(dto.password);
    const updated = await this.repo.updateOne({ _id: _id }, dto);
    return AccountMapper.entityToDto(updated);
  }

  async deleteAccount(_id: string): Promise<AccountDto> {
    await this.getAccountById(_id);
    const deleted = await this.repo.softDeleteOne({ _id: _id });
    return AccountMapper.entityToDto(deleted);
  }

  async getAccounts(query: PageRequestDto): Promise<AccountPageDto> {
    const result = await this.repo.getMany(query);
    return AccountMapper.pageEntityToPageDto(result);
  }

  async getAccountEntityByEmail(email: string): Promise<AccountEntity> {
    const exist = await this.repo.getOne({ email });
    if (!exist)
      throw new CustomException(HttpStatus.NOT_FOUND, {
        code: ErrorCode.ACCOUNT_NOT_FOUND,
        message: ErrorMessage.ACCOUNT_NOT_FOUND,
      });
    return exist;
  }
}
