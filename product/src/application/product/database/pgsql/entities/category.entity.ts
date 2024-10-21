import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ICategory, ICategoryEntity } from '../../../models/category.model';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @OneToMany(() => ProductEntity, (x) => x.category)
  products: ProductEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromICategory(iCategory: ICategory): CategoryEntity {
    if (!iCategory) {
      return null;
    }

    const category = new CategoryEntity();

    category.title = iCategory.title;

    return category;
  }
  static toICategoryEntity(category: CategoryEntity): ICategoryEntity {
    if (!category) {
      return null;
    }

    return {
      id: category.id.toString(),
      title: category.title,
      products:
        category.products && category.products.length > 0
          ? category.products.map((x) => ProductEntity.toIProductEntity(x))
          : [],
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
