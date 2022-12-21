import { FilterQuery, Model, SortOrder } from 'mongoose';
import { BaseEntity } from '../entities/base.entity';
import { IBaseRepository } from '../interfaces/IBaseRepository';
import { SortEnum } from '../../shared/enums/sort.enum';
import { IPageRequest } from '../interfaces/IPageRequest';
import { IPageResponse } from '../interfaces/IPageResponse';
import { calculatePageOffset } from '../../shared/utils/pagination.util';

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

  async createOne(data: E): Promise<E> {
    return this.repo.create(data);
  }

  async getOne(find: FilterQuery<E>): Promise<E> {
    return this.repo.findOne(find).lean();
  }

  async updateOne(find: FilterQuery<E>, data: any): Promise<E> {
    return this.repo.findOneAndUpdate(find, data, { new: true }).lean();
  }

  async deleteOne(find: FilterQuery<E>): Promise<E> {
    return this.repo.findOneAndDelete(find, { new: true }).lean();
  }

  async createMany(array: E[]): Promise<E[]> {
    return this.repo.insertMany(array);
  }

  async getMany(request: IPageRequest): Promise<IPageResponse<E>> {
    const { page, sort, pageSize, search } = request;
    const parsedSearch = this._convertSearch(search);
    const findAll = this.repo.find(parsedSearch || {});
    const count = this.repo.countDocuments(parsedSearch || {});

    if (page && !isNaN(page)) {
      findAll.limit(request.pageSize).skip(calculatePageOffset(page, pageSize));
    }

    if (sort) {
      findAll.sort(this._convertSort(sort) as { [key: string]: SortOrder });
    }

    if (page && !isNaN(page)) {
      const data = await findAll.lean().exec();
      const total = await count.exec();
      return {
        data: data as any,
        pageSize: Number(pageSize),
        page: Number(page),
        totalItem: total,
        totalPage: Math.ceil(total / pageSize),
      };
    } else {
      const data = await findAll.lean().exec();
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
    this.repo.findOne();
    return this.repo
      .findOneAndUpdate(
        find,
        { $set: { deletedAt: new Date() } },
        { new: true },
      )
      .lean();
  }
}
