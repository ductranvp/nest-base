import { CACHE_MANAGER, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountCreateDto } from '../dtos/request/account.create.dto';
import { AccountMapper } from '../utils/account.mapper';
import { IAccountService } from './IAccountService';
import { AccountDto } from '../dtos/response/account.dto';
import { AccountUpdateDto } from '../dtos/request/account.update.dto';
import { AccountPageDto } from '../dtos/response/account.page.dto';
import { ErrorCode, ErrorMessage } from '../../../app/constants/error.constant';
import { PageRequestDto } from '../../shared/dtos/page-request.dto';
import { Cache } from 'cache-manager';
import { hashPassword } from '../../../app/utils/password.util';
import { AccountRepository } from '../repositories/account.repository';
import { AccountEntity } from '../entities/account.entity';
import { CustomException } from '../../../common/shared/exceptions/custom.exception';

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

  async getAccountById(id: string): Promise<AccountDto> {
    const exist = await this.repo.getOne({ _id: id });
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

  async updateAccount(id: string, dto: AccountUpdateDto): Promise<AccountDto> {
    await this.getAccountById(id);
    if (dto.password) dto.password = await hashPassword(dto.password);
    const updated = await this.repo.updateOne({ _id: id }, dto);
    return AccountMapper.entityToDto(updated);
  }

  async deleteAccount(id: string): Promise<AccountDto> {
    await this.getAccountById(id);
    const deleted = await this.repo.softDeleteOne({ _id: id });
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

  async recoverAccount(id: string): Promise<AccountDto> {
    const exist = await this.repo.getOne({ _id: id }, { withDeleted: true });
    if (!exist)
      throw new CustomException(HttpStatus.NOT_FOUND, {
        code: ErrorCode.ACCOUNT_NOT_FOUND,
        message: ErrorMessage.ACCOUNT_NOT_FOUND,
      });
    const recovered = await this.repo.recoverOne({ _id: id });
    return AccountMapper.entityToDto(recovered);
  }
}
