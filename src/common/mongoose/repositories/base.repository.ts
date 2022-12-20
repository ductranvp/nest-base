import { BaseEntity } from '../entities';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import {
  IBaseRepository,
  IPageRequest,
  IPageResponse,
  IPaginationSort,
} from '../interfaces';
import { SortEnum } from '../../shared';
import { calculatePageOffset } from '../utils';

export class BaseRepository<E extends BaseEntity>
  implements IBaseRepository<E>
{
  protected repo: Model<E>;

  constructor(repository: Model<E>) {
    this.repo = repository;
  }

  private _convertSort(sort: IPaginationSort): Record<string, number> {
    const data: Record<string, number> = {};
    Object.keys(sort).forEach((val) => {
      data[val] = sort[val] === SortEnum.ASC ? 1 : -1;
    });

    return data;
  }

  async createOne(data: E): Promise<E> {
    return this.repo.create(data);
  }

  async getOne(find: FilterQuery<E>): Promise<E> {
    return this.repo.findOne(find).lean();
  }

  async updateOne(find: FilterQuery<E>, data: any): Promise<E> {
    return this.repo.findOneAndUpdate(find, data, { new: true });
  }

  async deleteOne(find: FilterQuery<E>): Promise<E> {
    return this.repo.findOneAndDelete(find, { new: true });
  }

  async createMany(array: E[]): Promise<E[]> {
    return this.repo.insertMany(array);
  }

  async getMany(request: IPageRequest): Promise<IPageResponse<E>> {
    const { page, sort, pageSize, search } = request;
    const findAll = this.repo.find(search || {});
    const count = this.repo.countDocuments(search || {});

    if (page && !isNaN(page)) {
      findAll.limit(request.pageSize).skip(calculatePageOffset(page, pageSize));
    }

    if (sort) {
      findAll.sort(this._convertSort(sort) as { [key: string]: SortOrder });
    }

    if (page && !isNaN(page)) {
      const data = await findAll.lean();
      const total = await count;
      return {
        data: data as any,
        pageSize: Number(pageSize),
        page: page,
        totalItem: total,
        totalPage: Math.ceil(total / pageSize),
      };
    } else {
      const data = await findAll.lean();
      return {
        data: data as any,
        pageSize: null,
        page: null,
        totalItem: null,
        totalPage: null,
      };
    }
  }

  async softDeleteOne(find: FilterQuery<E>): Promise<E> {
    return this.repo.findOneAndUpdate(
      find,
      { $set: { deletedAt: new Date() } },
      { new: true },
    );
  }
}
