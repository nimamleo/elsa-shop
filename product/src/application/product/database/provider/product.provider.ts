import { IProduct, IProductEntity } from '../../models/product.model';
import { Result } from '@common/result';
import { ICategory, ICategoryEntity } from '../../models/category.model';
import { GetProductList } from '../pgsql/service/dto/get-product-list.dto';
import { IBasket, IBasketEntity } from '../../models/basket.model';
import { IColor, IColorEntity } from '../../models/color.model';
import { ISize, ISizeEntity } from '../../models/size.model';
import { ICountry, ICountryEntity } from '../../models/country.model';
import { IQuality, IQualityEntity } from '../../models/quality.model';

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

  getColorList(): Promise<Result<IColorEntity[]>>;

  getSizeList(): Promise<Result<ISizeEntity[]>>;

  getCountryList(): Promise<Result<ICountryEntity[]>>;

  getQualityList(): Promise<Result<IQualityEntity[]>>;
}
export interface IProductWriter {
  createProduct(iProduct: IProduct): Promise<Result<IProductEntity>>;

  createColor(iColor: IColor): Promise<Result<IColorEntity>>;

  createSize(iSize: ISize): Promise<Result<ISizeEntity>>;

  createCountry(iCountry: ICountry): Promise<Result<ICountryEntity>>;

  createQuality(iQuality: IQuality): Promise<Result<IQualityEntity>>;

  createCategory(iCategory: ICategory): Promise<Result<ICategoryEntity>>;

  deleteProduct(id: string): Promise<Result<boolean>>;

  addToBasket(iBasket: IBasket): Promise<Result<IBasketEntity>>;
}
export interface IProductDatabaseProvider
  extends IProductReader,
    IProductWriter {}

export const PRODUCT_DATABASE_PROVIDER = 'product-database-provider';
