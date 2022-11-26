import { AccountRole } from '../account.constant';
import { IBaseEntity } from '@node-collection/nest-ready';

export interface IAccountEntity extends IBaseEntity {
  email: string;
  password: string;
  roles: AccountRole[];
}
