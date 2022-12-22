import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  DATABASE_UPDATED_AT_FIELD_NAME,
  DATABASE_CREATED_AT_FIELD_NAME,
  DATABASE_DELETED_AT_FIELD_NAME,
  IBaseEntity,
} from './IBaseEntity';

export class BaseEntity implements IBaseEntity<Types.ObjectId> {
  _id: Types.ObjectId;

  @Prop({
    immutable: true,
  })
  [DATABASE_CREATED_AT_FIELD_NAME]?: Date;

  @Prop()
  [DATABASE_UPDATED_AT_FIELD_NAME]?: Date;

  @Prop()
  [DATABASE_DELETED_AT_FIELD_NAME]?: Date;
}
