import { Injectable } from '@nestjs/common';
import { Query, Document } from 'mongoose';
import { PaginateResponse } from './interface/paginate.response';

@Injectable()
export class PaginationService {
  async paginate<T extends Document>(
    model: Query<T[], T>,
    totalDocs: number,
    page: number,
    perPage = 10,
  ): Promise<PaginateResponse<T>> {
    const collections = await model
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const paginationDetails: PaginateResponse<T>['pagination'] = {
      currentPage: page,
      numOfPages: Math.ceil(totalDocs / perPage),
      total: totalDocs,
    };
    const data = {
      data: collections,
      pagination: paginationDetails,
    };
    return data;
  }
}
