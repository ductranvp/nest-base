import { AccountAbstract } from '../../abstracts/account.abstract';
import { AccountRole } from '../../account.constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CollectionName } from '../../../../app/constants/app.constant';
import { OmitBaseFields } from '../../../../common/mongoose/abstracts/base.abstract';
import { BaseEntity } from '../../../../common/mongoose/entities/base.entity';

@Schema({ collection: CollectionName.ACCOUNT, timestamps: true })
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
