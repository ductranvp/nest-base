import { IAccountEntity } from '../../entities/IAccountEntity';
import { Types } from 'mongoose';
import { AccountRole } from '../../utils/account.enum';

export class AccountDto
  implements Omit<IAccountEntity, 'deletedAt' | 'password'>
{
  _id: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  roles: AccountRole[];
}
