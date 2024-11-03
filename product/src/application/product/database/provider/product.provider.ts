import { IProduct, IProductEntity } from '../../models/product.model';
import { Result } from '@common/result';
import { ICategory, ICategoryEntity } from '../../models/category.model';
import { GetProductList } from '../pgsql/service/dto/get-product-list.dto';
import { IBasket, IBasketEntity } from '../../models/basket.model';

export interface IProductReader {
  getCategoryList(): Promise<Result<ICategoryEntity[]>>;

  getProductList(
    queryable: GetProductList,
  ): Promise<Result<[IProductEntity[], number]>>;

  getBasketByUserIdAndProductId(
    userId: string,
    productId: string,
  ): Promise<Result<IBasketEntity>>;

  getBasketByUserId(userId: string): Promise<Result<IBasketEntity[]>>;

  getProductById(id: string): Promise<Result<IProductEntity>>;
}
export interface IProductWriter {
  createProduct(iProduct: IProduct): Promise<Result<IProductEntity>>;

  createCategory(iCategory: ICategory): Promise<Result<ICategoryEntity>>;

  deleteProduct(id: string): Promise<Result<boolean>>;

  addToBasket(iBasket: IBasket): Promise<Result<IBasketEntity>>;
}
export interface IProductDatabaseProvider
  extends IProductReader,
    IProductWriter {}

export const PRODUCT_DATABASE_PROVIDER = 'product-database-provider';
