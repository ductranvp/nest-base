import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from '@node-collection/nest-ready';

export class AccountRepository extends BaseRepository<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity)
    protected readonly repo: Repository<AccountEntity>,
  ) {
    super(repo);
  }
}
