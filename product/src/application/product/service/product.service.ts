import { Inject, Injectable } from '@nestjs/common';
import {
  IProductDatabaseProvider,
  PRODUCT_DATABASE_PROVIDER,
} from '../database/provider/product.provider';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { IProduct, IProductEntity } from '../models/product.model';
import { Err, Ok, Result } from '@common/result';
import { ICategory, ICategoryEntity } from '../models/category.model';
import { IPaginatedResult } from '@common/pagination/paginated-result.interface';
import { PaginationResult } from '@common/pagination/paginatio-result';
import { ILimitation } from '@common/pagination/limitation.interface';
import { GetProductList } from './dto/get-product-list.dto';
import { IBasket, IBasketEntity } from '../models/basket.model';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_DATABASE_PROVIDER)
    private readonly productDatabaseProvider: IProductDatabaseProvider,
  ) {}

  @HandleError
  async createProduct(iProduct: IProduct): Promise<Result<IProductEntity>> {
    const createProduct =
      await this.productDatabaseProvider.createProduct(iProduct);
    if (createProduct.isError()) {
      return Err(createProduct.err);
    }

    return Ok(createProduct.value);
  }

  @HandleError
  async CreateCategory(iCategory: ICategory): Promise<Result<ICategoryEntity>> {
    const res = await this.productDatabaseProvider.createCategory(iCategory);
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

  @HandleError
  async getProductList(
    dto: GetProductList,
  ): Promise<Result<IPaginatedResult<IProductEntity>>> {
    const res = await this.productDatabaseProvider.getProductList({
      limitation: dto.limitation,
      productIds: dto.productIds,
      orderBy: dto.orderBy,
      orderType: dto.orderType,
    });
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(new PaginationResult(res.value[0], res.value[1], dto.limitation));
  }

  @HandleError
  async deleteProduct(id: string): Promise<Result<boolean>> {
    const res = await this.productDatabaseProvider.deleteProduct(id);
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(res.value);
  }

  @HandleError
  async getUserBasket(userId: string): Promise<Result<IBasketEntity[]>> {
    const res = await this.productDatabaseProvider.getBasketByUserId(userId);
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(res.value);
  }
}
