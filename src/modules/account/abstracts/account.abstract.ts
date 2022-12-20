import { BaseAbstract } from 'src/common';
import { AccountRole } from '../account.constant';

export interface AccountAbstract extends BaseAbstract {
  email: string;
  password: string;
  roles: AccountRole[];
}
