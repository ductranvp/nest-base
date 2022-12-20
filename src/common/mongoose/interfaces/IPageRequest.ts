import { SortEnum } from '../../shared';

export type IPaginationSort = Record<string, SortEnum>;
export interface IPageRequest {
  page?: number;
  pageSize?: number;
  sort?: IPaginationSort;
  search?: Record<string, string>;
}
