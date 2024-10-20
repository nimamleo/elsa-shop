import { IProductDatabaseProvider } from '../../provider/product.provider';
import { IProduct, IProductEntity } from '../../../models/product.model';
import { Err, Ok, Result } from '@common/result';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ICategory, ICategoryEntity } from '../../../models/category.model';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class ProductPgsqlService implements IProductDatabaseProvider {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  @HandleError
  async createProduct(iProduct: IProduct): Promise<Result<IProductEntity>> {
    const res = await this.productRepository.save(
      ProductEntity.fromIProduct(iProduct),
    );
    if (!res) {
      return Err('create product failed');
    }

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
}
