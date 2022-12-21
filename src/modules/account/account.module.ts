import { Module } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountEntity, AccountSchema } from './entities/account.entity';
import { AccountRepository } from './repositories/account.repository';

const repositories = [AccountRepository];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountEntity.name, schema: AccountSchema },
    ]),
  ],
  controllers: [AccountController],
  providers: [...repositories, AccountService],
  exports: [...repositories, AccountService],
})
export class AccountModule {}
