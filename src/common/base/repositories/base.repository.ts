import { FilterQuery, Model, SortOrder } from 'mongoose';
import { BaseEntity } from '../entities/base.entity';
import { IBaseRepository } from './IBaseRepository';
import { SortEnum } from '../../shared/enums/sort.enum';
import { IPageRequest } from '../pagination/IPageRequest';
import { IPageResponse } from '../pagination/IPageResponse';
import { calculatePageOffset } from '../../shared/utils/pagination.util';
import { IDatabaseOptions } from './IDatabaseOptions';
import { DATABASE_DELETED_AT_FIELD_NAME } from '../entities/IBaseEntity';

export class BaseRepository<E extends BaseEntity>
  implements IBaseRepository<E>
{
  protected repo: Model<E>;

  constructor(repository: Model<E>) {
    this.repo = repository;
  }

  private _convertSort(sorts: string[]): Record<string, number> {
    const data: Record<string, number> = {};
    if (!sorts || !sorts.length) return data;
    sorts.forEach((sort) => {
      const [key, value] = sort.split('=');
      data[key] = value === SortEnum.ASC ? 1 : -1;
    });

    return data;
  }

  private _convertSearch(searches: string[]): Record<string, any> {
    if (!searches || !searches.length) return {};
    return {
      $or: searches.map((search) => {
        const [key, value] = search.split('=');
        return {
          [key]: {
            $regex: new RegExp(value),
            $options: 'i',
          },
        };
      }),
    };
  }

  async createOne(data: E, options?: IDatabaseOptions): Promise<E> {
    return this.repo.create(data);
  }

  async getOne(find: FilterQuery<E>, options?: IDatabaseOptions): Promise<E> {
    const query = this.repo.findOne(find);
    if (options && options.withDeleted) {
      query.where(DATABASE_DELETED_AT_FIELD_NAME).exists(true);
    } else {
      query.where(DATABASE_DELETED_AT_FIELD_NAME).exists(false);
    }
    return query.lean();
  }

  async updateOne(
    find: FilterQuery<E>,
    data: any,
    options?: IDatabaseOptions,
  ): Promise<E> {
    return this.repo
      .findOneAndUpdate(find, data, { new: true })
      .where(DATABASE_DELETED_AT_FIELD_NAME)
      .exists(false);
  }

  async deleteOne(
    find: FilterQuery<E>,
    options?: IDatabaseOptions,
  ): Promise<E> {
    return this.repo.findOneAndDelete(find);
  }

  async createMany(array: E[], options?: IDatabaseOptions): Promise<E[]> {
    return this.repo.insertMany(array);
  }

  async getMany(
    request: IPageRequest,
    options?: IDatabaseOptions,
  ): Promise<IPageResponse<E>> {
    const { page, sort, pageSize, search } = request;
    const parsedSearch = this._convertSearch(search);
    const findAll = this.repo.find(parsedSearch || {});
    const count = this.repo.countDocuments(parsedSearch || {});

    if (options && options.withDeleted) {
      findAll.where(DATABASE_DELETED_AT_FIELD_NAME).exists(true);
      count.where(DATABASE_DELETED_AT_FIELD_NAME).exists(true);
    } else {
      findAll.where(DATABASE_DELETED_AT_FIELD_NAME).exists(false);
      count.where(DATABASE_DELETED_AT_FIELD_NAME).exists(false);
    }

    if (page && !isNaN(page)) {
      findAll.limit(request.pageSize).skip(calculatePageOffset(page, pageSize));
    }

    if (sort) {
      findAll.sort(this._convertSort(sort) as { [key: string]: SortOrder });
    }

    if (page && !isNaN(page)) {
      const data = <E[]>await findAll.lean().exec();
      const total = await count.exec();
      return {
        data: data,
        pageSize: Number(pageSize),
        page: Number(page),
        totalItem: total,
        totalPage: Math.ceil(total / pageSize),
      };
    } else {
      const data = <E[]>await findAll.lean().exec();
      return {
        data: data,
        pageSize: data.length,
        page: 1,
        totalItem: data.length,
        totalPage: 1,
      };
    }
  }

  async softDeleteOne(
    find: FilterQuery<E>,
    options?: IDatabaseOptions,
  ): Promise<E> {
    return this.repo
      .findOneAndUpdate(
        find,
        { $set: { [DATABASE_DELETED_AT_FIELD_NAME]: new Date() } },
        { new: false },
      )
      .where(DATABASE_DELETED_AT_FIELD_NAME)
      .exists(false);
  }

  async recoverOne(
    find: FilterQuery<E>,
    options?: IDatabaseOptions,
  ): Promise<E> {
    return this.repo
      .findOneAndUpdate(
        find,
        { $unset: { [DATABASE_DELETED_AT_FIELD_NAME]: '' } },
        { new: true },
      )
      .where(DATABASE_DELETED_AT_FIELD_NAME)
      .exists(true);
  }
}
