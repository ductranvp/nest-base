import { IBaseEntity } from '../../../common/base/interfaces/IBaseEntity';
import { AccountRole } from '../utils/account.enum';

export interface IAccountEntity extends IBaseEntity {
  email: string;
  password: string;
  roles: AccountRole[];
}
