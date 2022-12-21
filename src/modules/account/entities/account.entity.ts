import { IAccountEntity } from './IAccountEntity';
import { ACCOUNT_COLLECTION_NAME } from '../utils/account.constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OmitBaseFields } from '../../../common/base/interfaces/IBaseEntity';
import { BaseEntity } from '../../../common/base/entities/base.entity';
import { AccountRole } from '../utils/account.enum';

@Schema({ collection: ACCOUNT_COLLECTION_NAME, timestamps: true })
export class AccountEntity
  extends BaseEntity
  implements Omit<IAccountEntity, OmitBaseFields>
{
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  roles: AccountRole[];
}
export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
