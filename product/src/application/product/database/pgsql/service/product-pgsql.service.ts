import { IProductDatabaseProvider } from '../../provider/product.provider';
import { IProduct, IProductEntity } from '../../../models/product.model';
import { Err, Ok, Result } from '@common/result';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ICategory, ICategoryEntity } from '../../../models/category.model';
import { CategoryEntity } from '../entities/category.entity';
import { InfoEntity } from '../entities/info.entity';
import { GetProductList } from './dto/get-product-list.dto';
import { ProductOrderBy } from '../../../enum/product-order-by.enum';
import { IBasket, IBasketEntity } from '../../../models/basket.model';
import { BasketEntity } from '../entities/basket.entity';
import { GenericStatusCodes } from '@common/enums/status.enum';
import { IColor, IColorEntity } from '../../../models/color.model';
import { ISize, ISizeEntity } from '../../../models/size.model';
import { ColorEntity } from '../entities/color.entity';
import { SizeEntity } from '../entities/size.entity';
import { IQuality, IQualityEntity } from '../../../models/quality.model';
import { ICountry, ICountryEntity } from '../../../models/country.model';
import { QualityEntity } from '../entities/quality.entity';
import { CountryEntity } from '../entities/country.entity';

@Injectable()
export class ProductPgsqlService implements IProductDatabaseProvider {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(InfoEntity)
    private readonly infoRepository: Repository<InfoEntity>,
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
    @InjectRepository(QualityEntity)
    private readonly qualityRepository: Repository<QualityEntity>,
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
    @InjectRepository(SizeEntity)
    private readonly sizeRepository: Repository<SizeEntity>,
    @InjectRepository(BasketEntity)
    private readonly basketRepository: Repository<BasketEntity>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @HandleError
  async createProduct(iProduct: IProduct): Promise<Result<IProductEntity>> {
    const res = await this.dataSource.transaction(
      async (entityManager: EntityManager): Promise<ProductEntity> => {
        const product = await entityManager
          .getRepository(ProductEntity)
          .save(ProductEntity.fromIProduct(iProduct));

        product.info = iProduct.info.map((x) =>
          InfoEntity.fromIInfo({
            product: { id: product.id.toString() },
            count: x.count,
            size: x.size,
            color: x.color,
          }),
        );

        await entityManager.getRepository(InfoEntity).save(product.info);

        return product;
      },
    );

    return Ok(ProductEntity.toIProductEntity(res));
  }

  @HandleError
  async createCategory(iCategory: ICategory): Promise<Result<ICategoryEntity>> {
    const res = await this.categoryRepository.save(
      CategoryEntity.fromICategory(iCategory),
    );
    if (!res) {
      return Err('create category failed');
    }

    return Ok(CategoryEntity.toICategoryEntity(res));
  }

  @HandleError
  async createColor(iColor: IColor): Promise<Result<IColorEntity>> {
    const res = await this.colorRepository.save(ColorEntity.fromIColor(iColor));
    if (!res) {
      return Err('some thing went wrong');
    }

    return Ok(ColorEntity.toIColorEntity(res));
  }

  @HandleError
  async createSize(iSize: ISize): Promise<Result<ISizeEntity>> {
    const res = await this.sizeRepository.save(SizeEntity.fromISize(iSize));
    if (!res) {
      return Err('some thing went wrong');
    }

    return Ok(SizeEntity.toISizeEntity(res));
  }

  @HandleError
  async createQuality(iQuality: IQuality): Promise<Result<IQualityEntity>> {
    const res = await this.qualityRepository.save(
      QualityEntity.fromIQuality(iQuality),
    );
    if (!res) {
      return Err('some thing went wrong');
    }

    return Ok(QualityEntity.toIQualityEntity(res));
  }

  @HandleError
  async createCountry(iCountry: ICountry): Promise<Result<ICountryEntity>> {
    const res = await this.countryRepository.save(
      CountryEntity.fromICountry(iCountry),
    );
    if (!res) {
      return Err('some thing went wrong');
    }

    return Ok(CountryEntity.toICountryEntity(res));
  }

  @HandleError
  async getCategoryList(): Promise<Result<ICategoryEntity[]>> {
    const res = await this.categoryRepository.createQueryBuilder().getMany();
    return Ok(res.map((x) => CategoryEntity.toICategoryEntity(x)));
  }

  @HandleError
  async getProductList(
    queryable: GetProductList,
  ): Promise<Result<[IProductEntity[], number]>> {
    if (!queryable.orderType) {
      queryable.orderType = 'DESC';
    }
    if (!queryable.orderBy) {
      queryable.orderBy = ProductOrderBy.CREATED_AT;
    }

    const query = this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.info', 'i')
      .leftJoinAndSelect('i.color', 'c')
      .leftJoinAndSelect('i.size', 's')
      .leftJoinAndSelect('p.country', 'co')
      .leftJoinAndSelect('p.quality', 'q');

    if (queryable.productIds && queryable.productIds.length > 0) {
      query.andWhere('p.id in (:...ids)', { ids: queryable.productIds });
    }

    if (queryable.colorIds && queryable.colorIds.length > 0) {
      query.andWhere('c.id in (:...colorIds)', {
        colorIds: queryable.colorIds,
      });
    }

    if (queryable.sizeIds && queryable.sizeIds.length > 0) {
      query.andWhere('s.id in (:...sizeIds)', { sizeIds: queryable.sizeIds });
    }

    if (queryable.price && queryable.price.length == 2) {
      query.andWhere('p.price >= :min and p.price <= :max', {
        min: queryable.price[0],
        max: queryable.price[1],
      });
    }

    switch (queryable.orderBy) {
      case ProductOrderBy.CREATED_AT: {
        query.orderBy('p.createdAt', queryable.orderType);
        break;
      }
      case ProductOrderBy.PRICE: {
        query.orderBy('p.price', queryable.orderType);
      }
    }

    const [res, count] = await query
      .skip(queryable.limitation.skip)
      .limit(queryable.limitation.limit)
      .getManyAndCount();

    return Ok([res.map((x) => ProductEntity.toIProductEntity(x)), count]);
  }

  @HandleError
  async deleteProduct(id: string): Promise<Result<boolean>> {
    const res = await this.productRepository.delete(id);
    if (res.affected == 0) {
      return Err('something went wrong');
    }

    return Ok(true);
  }

  @HandleError
  async getBasketByUserIdAndProductId(
    userId: string,
    productId: string,
  ): Promise<Result<IBasketEntity>> {
    const res = await this.basketRepository
      .createQueryBuilder('b')
      .where('b.userId = :userId', { userId: userId })
      .andWhere('b.productId = :productId', { productId: productId })
      .getOne();

    if (!res) {
      return Err('basket not found', GenericStatusCodes.NOT_FOUND);
    }

    return Ok(BasketEntity.toIBasketEntity(res));
  }

  @HandleError
  async addToBasket(iBasket: IBasket): Promise<Result<IBasketEntity>> {
    const res = await this.dataSource.transaction(
      async (entityManager: EntityManager) => {
        const getBasket = await entityManager
          .getRepository(BasketEntity)
          .createQueryBuilder('b')
          .where('b.userId = :userId', { userId: iBasket.userId })
          .andWhere('b.productId = :productId', {
            productId: iBasket.product.id,
          })
          .getOne();

        if (!getBasket) {
          const createBasket = await this.basketRepository.save(
            BasketEntity.fromIBasket(iBasket),
          );

          return Ok(BasketEntity.toIBasketEntity(createBasket));
        }

        const updateBasket = await entityManager
          .getRepository(BasketEntity)
          .update(getBasket.id, {
            count: getBasket.count + iBasket.count,
          });

        if (updateBasket.affected === 0) {
          return Err('something went wrong', GenericStatusCodes.INTERNAL);
        }

        return Ok(BasketEntity.toIBasketEntity(getBasket));
      },
    );

    return res;
  }

  @HandleError
  async getBasketByUserId(userId: string): Promise<Result<IBasketEntity[]>> {
    const res = await this.basketRepository
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.product', 'p')
      .leftJoinAndSelect('b.productInfo', 'i')
      .where('b.userId = :userId', { userId: userId })
      .getMany();

    return Ok(res.map((x) => BasketEntity.toIBasketEntity(x)));
  }

  @HandleError
  async getProductById(id: string): Promise<Result<IProductEntity>> {
    const res = await this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.info', 'i')
      .where('p.id = :id', { id: id })
      .getOne();

    if (!res) {
      return Err('product not found', GenericStatusCodes.NOT_FOUND);
    }

    return Ok(ProductEntity.toIProductEntity(res));
  }

  @HandleError
  async getSizeList(): Promise<Result<ISizeEntity[]>> {
    const res = await this.sizeRepository.createQueryBuilder().getMany();
    return Ok(res.map((x) => SizeEntity.toISizeEntity(x)));
  }

  @HandleError
  async getColorList(): Promise<Result<IColorEntity[]>> {
    const res = await this.colorRepository.createQueryBuilder().getMany();
    return Ok(res.map((x) => ColorEntity.toIColorEntity(x)));
  }

  @HandleError
  async getQualityList(): Promise<Result<IQualityEntity[]>> {
    const res = await this.qualityRepository.createQueryBuilder().getMany();
    return Ok(res.map((x) => QualityEntity.toIQualityEntity(x)));
  }

  @HandleError
  async getCountryList(): Promise<Result<ICountryEntity[]>> {
    const res = await this.countryRepository.createQueryBuilder().getMany();
    return Ok(res.map((x) => CountryEntity.toICountryEntity(x)));
  }
}
