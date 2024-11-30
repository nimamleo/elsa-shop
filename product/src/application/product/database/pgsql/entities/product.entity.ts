import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { InfoEntity } from './info.entity';
import { IProduct, IProductEntity } from '../../../models/product.model';
import { BasketEntity } from './basket.entity';
import { CountryEntity } from './country.entity';
import { QualityEntity } from './quality.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'bigint', unsigned: true })
  qualityId: string;

  @ManyToOne(() => QualityEntity, (x) => x.product)
  @JoinColumn({ name: 'qualityId' })
  quality: QualityEntity;

  @Column({ type: 'bigint', unsigned: true })
  countryId: string;

  @ManyToOne(() => CountryEntity, (x) => x.product)
  @JoinColumn({ name: 'countryId' })
  country: CountryEntity;

  @Column({ type: 'bigint', unsigned: true })
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (x) => x.products)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(() => InfoEntity, (x) => x.product)
  info: InfoEntity[];

  @OneToMany(() => BasketEntity, (x) => x.product)
  basket: BasketEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIProduct(iProduct: IProduct): ProductEntity {
    if (!iProduct) {
      return null;
    }

    const product = new ProductEntity();

    product.title = iProduct.title;
    product.description = iProduct.description;
    product.price = iProduct.price;
    product.countryId = iProduct.country.id;
    product.qualityId = iProduct.quality.id;
    product.countryId = iProduct.country.id;
    product.categoryId = Number(iProduct.category.id);

    return product;
  }
  static toIProductEntity(product: ProductEntity): IProductEntity {
    if (!product) {
      return null;
    }

    return {
      id: product.id.toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      country: product.country
        ? CountryEntity.toICountryEntity(product.country)
        : { id: product.categoryId.toString() },
      quality: product.quality
        ? QualityEntity.toIQualityEntity(product.quality)
        : { id: product.qualityId.toString() },
      category: product.category
        ? CategoryEntity.toICategoryEntity(product.category)
        : { id: product.categoryId.toString() },
      info:
        product.info && product.info.length > 0
          ? product.info.map((x) => InfoEntity.toIInfoEntity(x))
          : [],
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
