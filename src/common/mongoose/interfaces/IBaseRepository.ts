import { IPageRequest } from './IPageRequest';
import { IPageResponse } from './IPageResponse';
import { FilterQuery } from 'mongoose';

/**
 * Base repository for most repository needing basic crud
 * */
export interface IBaseRepository<T> {
  /**
   * Create one resource
   * */
  createOne(data: T): Promise<T>;
  /**
   * Create many resources
   * */
  createMany(array: T[]): Promise<T[]>;
  /**
   * Get one resource
   * */
  getOne(find: any): Promise<T>;
  /**
   * Get many resources by given condition
   * */
  getMany(request: IPageRequest): Promise<IPageResponse<T> | T[]>;
  /**
   * Update one resource by given condition
   * */
  updateOne(find: FilterQuery<T>, data: any): Promise<T>;
  /**
   * Delete one resource by given condition
   * */
  deleteOne(find: FilterQuery<T>): Promise<T>;
  /**
   * Soft delete one resource by given condition
   * */
  softDeleteOne(find: FilterQuery<T>): Promise<T>;
}
