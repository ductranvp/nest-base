/**
 * Base interface for most entity with audit and soft delete
 * */
export abstract class BaseAbstract<T = any> {
  _id: T;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type OmitBaseFields = '_id' | 'updatedAt' | 'createdAt' | 'deletedAt';
