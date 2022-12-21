import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseAbstract } from '../abstracts/base.abstract';

export class BaseEntity implements BaseAbstract<Types.ObjectId> {
  _id: Types.ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop()
  deletedAt?: Date;
}
