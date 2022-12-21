/**
 * Base interface for most entity with audit and soft delete
 * */
export interface IBaseEntity<T = any> {
  _id: T;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type OmitBaseFields = '_id' | 'updatedAt' | 'createdAt' | 'deletedAt';
