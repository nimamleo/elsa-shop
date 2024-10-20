import { Inject, Injectable } from '@nestjs/common';
import {
  IProductDatabaseProvider,
  PRODUCT_DATABASE_PROVIDER,
} from '../database/provider/product.provider';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { IProduct, IProductEntity } from '../models/product.model';
import { Err, Ok, Result } from '@common/result';
import { ICategory, ICategoryEntity } from '../models/category.model';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_DATABASE_PROVIDER)
    private readonly productDatabaseProvider: IProductDatabaseProvider,
  ) {}

  @HandleError
  async createProduct(iProduct: IProduct): Promise<Result<IProductEntity>> {
    const res = await this.productDatabaseProvider.createProduct(iProduct);
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(res.value);
  }

  @HandleError
  async CreateCategory(iCategory: ICategory): Promise<Result<ICategoryEntity>> {
    const res = await this.productDatabaseProvider.CreateCategory(iCategory);
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(res.value);
  }

  @HandleError
  async getCategoryList(): Promise<Result<ICategoryEntity[]>> {
    const res = await this.productDatabaseProvider.getCategoryList();
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(res.value);
  }
}
