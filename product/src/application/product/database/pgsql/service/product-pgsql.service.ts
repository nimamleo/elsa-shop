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
import { Product1729446557373 } from '@infrastructure/infrastructure/database/pgsql/migrations/product/1729446557373-product.migration';
import { InfoEntity } from '../entities/info.entity';
import { GetProductList } from './dto/get-product-list.dto';

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
  async CreateCategory(iCategory: ICategory): Promise<Result<ICategoryEntity>> {
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
    const [res, count] = await this.productRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.info', 'i')
      .skip(queryable.limitation.skip)
      .limit(queryable.limitation.limit)
      .getManyAndCount();

    return Ok([res.map((x) => ProductEntity.toIProductEntity(x)), count]);
  }
}
