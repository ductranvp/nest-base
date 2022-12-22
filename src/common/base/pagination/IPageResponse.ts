/**
 * Response structure for requests with pagination
 * */
export interface IPageResponse<E> {
  /**
   * List paginated data
   * */
  data: E[];
  /**
   * Current query page
   * */
  page: number;
  /**
   * Size of page
   * */
  pageSize: number;
  /**
   * Total page, calculated by totalItem / pageSize
   * */
  totalPage: number;
  /**
   * Total item in database
   * */
  totalItem: number;
}
