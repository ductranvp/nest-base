import { AccountDto } from './account.dto';
import { IPageResponse } from '../../../../common/base/pagination/IPageResponse';

export class AccountPageDto implements IPageResponse<AccountDto> {
  data: AccountDto[];
  page: number;
  pageSize: number;
  totalItem: number;
  totalPage: number;
}
