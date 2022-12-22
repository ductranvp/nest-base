export const DATABASE_CREATED_AT_FIELD_NAME = 'createdAt';
export const DATABASE_UPDATED_AT_FIELD_NAME = 'updatedAt';
export const DATABASE_DELETED_AT_FIELD_NAME = 'deletedAt';

/**
 * Base interface for most entity with audit and soft delete
 * */
export interface IBaseEntity<T = any> {
  _id: T;
  [DATABASE_CREATED_AT_FIELD_NAME]?: Date;
  [DATABASE_UPDATED_AT_FIELD_NAME]?: Date;
  [DATABASE_DELETED_AT_FIELD_NAME]?: Date;
}

export type OmitBaseFields = '_id' | 'createdAt' | 'updatedAt' | 'deletedAt';
