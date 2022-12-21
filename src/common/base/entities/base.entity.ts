import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IBaseEntity } from '../interfaces/IBaseEntity';

export class BaseEntity implements IBaseEntity<Types.ObjectId> {
  _id: Types.ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop()
  deletedAt?: Date;
}
