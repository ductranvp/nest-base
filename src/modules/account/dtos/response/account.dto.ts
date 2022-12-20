import { AccountAbstract } from '../../abstracts/account.abstract';
import { AccountRole } from '../../account.constant';
import { Types } from 'mongoose';

export class AccountDto
  implements Omit<AccountAbstract, 'deletedAt' | 'password'>
{
  _id: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  roles: AccountRole[];
}
