import { Module } from '@nestjs/common';
import { AccountRepository } from './repositories/account.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountEntity, AccountSchema } from './entities/account.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountEntity.name, schema: AccountSchema },
    ]),
  ],
  providers: [AccountRepository],
  exports: [AccountRepository],
})
export class AccountRepositoryModule {}
