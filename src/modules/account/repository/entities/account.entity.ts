import { AccountAbstract } from '../../abstracts/account.abstract';
import { AccountRole } from '../../account.constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity, OmitBaseFields } from '../../../../common';

@Schema({ collection: 'accounts' })
export class AccountEntity
  extends BaseEntity
  implements Omit<AccountAbstract, OmitBaseFields>
{
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  roles: AccountRole[];
}
export const AccountSchema = SchemaFactory.createForClass(AccountEntity);
