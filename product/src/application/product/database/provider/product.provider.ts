import { IProduct, IProductEntity } from '../../models/product.model';
import { Result } from '@common/result';
import { ICategory, ICategoryEntity } from '../../models/category.model';

export interface IProductReader {
  getCategoryList(): Promise<Result<ICategoryEntity[]>>;
}
export interface IProductWriter {
  createProduct(iProduct: IProduct): Promise<Result<IProductEntity>>;

  CreateCategory(iCategory: ICategory): Promise<Result<ICategoryEntity>>;
}
export interface IProductDatabaseProvider
  extends IProductReader,
    IProductWriter {}

export const PRODUCT_DATABASE_PROVIDER = 'product-database-provider';
