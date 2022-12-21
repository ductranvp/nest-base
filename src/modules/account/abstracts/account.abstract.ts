import { AccountRole } from '../account.constant';
import { BaseAbstract } from '../../../common/mongoose/abstracts/base.abstract';

export abstract class AccountAbstract extends BaseAbstract {
  email: string;
  password: string;
  roles: AccountRole[];
}
