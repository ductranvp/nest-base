import { AccountEntity } from '../entities/account.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../../common';

export class AccountRepository extends BaseRepository<AccountEntity> {
  constructor(
    @InjectModel(AccountEntity.name)
    protected readonly repo: Model<AccountEntity>,
  ) {
    super(repo);
  }
}
