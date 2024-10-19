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
import { Quality } from '../../../enum/quality.enum';
import { Country } from '../../../enum/country.enum';
import { CategoryEntity } from './category.entity';
import { InfoEntity } from './info.entity';
import { IProduct, IProductEntity } from '../../../models/product.model';

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

  @Column({ type: 'enum', enum: Quality })
  quality: Quality;

  @Column({ type: 'enum', enum: Country })
  country: Country;

  @CreateDateColumn({ type: 'bigint', unsigned: true })
  categoryId: number;

  @ManyToOne(() => CategoryEntity, (x) => x.products)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(() => InfoEntity, (x) => x.product)
  info: InfoEntity[];

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
    product.country = iProduct.country;
    product.quality = iProduct.quality;
    product.country = iProduct.country;
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
      country: product.country,
      quality: product.quality,
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
