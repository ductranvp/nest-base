import { Prop } from '@nestjs/mongoose';
import { BaseAbstract } from '../abstracts';
import { Types } from 'mongoose';

export class BaseEntity implements BaseAbstract<Types.ObjectId> {
  _id: Types.ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop()
  deletedAt?: Date;
}
