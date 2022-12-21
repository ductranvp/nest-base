import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../utils/auth.constant';
import { AccountRole } from '../../account/utils/account.enum';

export const Roles = (...roles: AccountRole[]) => SetMetadata(ROLES_KEY, roles);
