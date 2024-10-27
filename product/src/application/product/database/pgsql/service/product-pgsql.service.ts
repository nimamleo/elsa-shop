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

@Injectable()
export class ProductPgsqlService implements IProductDatabaseProvider {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(InfoEntity)
    private readonly infoRepository: Repository<InfoEntity>,
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
      .leftJoinAndSelect('p.info', 'i');

    if (queryable.productIds && queryable.productIds.length > 0) {
      query.where('p.id in (:...ids)', { ids: queryable.productIds });
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
}
