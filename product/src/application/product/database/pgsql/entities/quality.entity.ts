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
import { ISize, ISizeEntity } from '../../../models/size.model';
import { InfoEntity } from './info.entity';
import { IQuality, IQualityEntity } from '../../../models/quality.model';
import { ProductEntity } from './product.entity';

@Entity('quality')
export class QualityEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @OneToMany(() => ProductEntity, (x) => x.country)
  product: ProductEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIQuality(iQuality: IQuality): QualityEntity {
    if (!iQuality) {
      return null;
    }

    const quality = new QualityEntity();

    quality.title = iQuality.title;

    return quality;
  }

  static toIQualityEntity(quality: QualityEntity): IQualityEntity {
    if (!quality) {
      return null;
    }

    return {
      id: quality.id.toString(),
      title: quality.title,
      product:
        quality.product && quality.product.length > 0
          ? quality.product.map((x) => ProductEntity.toIProductEntity(x))
          : [],
      createdAt: quality.createdAt,
      updatedAt: quality.updatedAt,
    };
  }
}
