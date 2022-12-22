import { IPageRequest } from '../pagination/IPageRequest';
import { IPageResponse } from '../pagination/IPageResponse';
import { FilterQuery } from 'mongoose';
import { IDatabaseOptions } from './IDatabaseOptions';

/**
 * Base repository for most repository with basic crud
 * */
export interface IBaseRepository<E> {
  /**
   * Create one resource
   * */
  createOne(data: E, options?: IDatabaseOptions): Promise<E>;
  /**
   * Create many resources
   * */
  createMany(array: E[], options?: IDatabaseOptions): Promise<E[]>;
  /**
   * Get one resource
   * */
  getOne(find: FilterQuery<E>, options?: IDatabaseOptions): Promise<E>;
  /**
   * Get many resources by given condition
   * */
  getMany(
    request: IPageRequest,
    options?: IDatabaseOptions,
  ): Promise<IPageResponse<E> | E[]>;
  /**
   * Update one resource by given condition
   * */
  updateOne(
    find: FilterQuery<E>,
    data: any,
    options?: IDatabaseOptions,
  ): Promise<E>;
  /**
   * Delete one resource by given condition
   * */
  deleteOne(find: FilterQuery<E>, options?: IDatabaseOptions): Promise<E>;
  /**
   * Soft delete one resource by given condition
   * */
  softDeleteOne(find: FilterQuery<E>, options?: IDatabaseOptions): Promise<E>;
  /**
   * Recover soft deleted one resource by given condition
   * */
  recoverOne(find: FilterQuery<E>, options?: IDatabaseOptions): Promise<E>;
}
