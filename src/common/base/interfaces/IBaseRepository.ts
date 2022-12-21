import { IPageRequest } from './IPageRequest';
import { IPageResponse } from './IPageResponse';
import { FilterQuery } from 'mongoose';

/**
 * Base repository for most repository needing basic crud
 * */
export interface IBaseRepository<E> {
  /**
   * Create one resource
   * */
  createOne(data: E): Promise<E>;
  /**
   * Create many resources
   * */
  createMany(array: E[]): Promise<E[]>;
  /**
   * Get one resource
   * */
  getOne(find: any): Promise<E>;
  /**
   * Get many resources by given condition
   * */
  getMany(request: IPageRequest): Promise<IPageResponse<E> | E[]>;
  /**
   * Update one resource by given condition
   * */
  updateOne(find: FilterQuery<E>, data: any): Promise<E>;
  /**
   * Delete one resource by given condition
   * */
  deleteOne(find: FilterQuery<E>): Promise<E>;
  /**
   * Soft delete one resource by given condition
   * */
  softDeleteOne(find: FilterQuery<E>): Promise<E>;
}
