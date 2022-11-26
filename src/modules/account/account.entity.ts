import { Column, Entity } from 'typeorm';
import { TableName } from '../../constants/app.constant';
import { IAccountEntity } from './interfaces/IAccountEntity';
import { AccountRole } from './account.constant';
import { BaseEntity, OmitBaseFields } from '@node-collection/nest-ready';

@Entity({ name: TableName.ACCOUNT })
export class AccountEntity
  extends BaseEntity
  implements Omit<IAccountEntity, OmitBaseFields>
{
  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'simple-array', nullable: true, enum: AccountRole })
  roles: AccountRole[];
}
