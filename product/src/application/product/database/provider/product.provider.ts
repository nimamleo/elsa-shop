import { IProduct, IProductEntity } from '../../models/product.model';
import { Result } from '@common/result';
import { ICategory, ICategoryEntity } from '../../models/category.model';
import { GetProductList } from '../pgsql/service/dto/get-product-list.dto';

export interface IProductReader {
  getCategoryList(): Promise<Result<ICategoryEntity[]>>;

  getProductList(
    queryable: GetProductList,
  ): Promise<Result<[IProductEntity[], number]>>;
}
export interface IProductWriter {
  createProduct(iProduct: IProduct): Promise<Result<IProductEntity>>;

  CreateCategory(iCategory: ICategory): Promise<Result<ICategoryEntity>>;
}
export interface IProductDatabaseProvider
  extends IProductReader,
    IProductWriter {}

export const PRODUCT_DATABASE_PROVIDER = 'product-database-provider';
