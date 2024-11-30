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
import { ProductEntity } from './product.entity';
import { IInfo, IInfoEntity } from '../../../models/info.model';
import { BasketEntity } from './basket.entity';
import { SizeEntity } from './size.entity';
import { ColorEntity } from './color.entity';
import { QualityEntity } from './quality.entity';
import { CountryEntity } from './country.entity';

@Entity('info')
export class InfoEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  colorId: number;

  @Column({ type: 'bigint', unsigned: true })
  sizeId: number;

  @ManyToOne(() => ColorEntity, (x) => x.info)
  @JoinColumn({ name: 'colorId' })
  color: ColorEntity;

  @ManyToOne(() => SizeEntity, (x) => x.info)
  @JoinColumn({ name: 'sizeId' })
  size: SizeEntity;

  @Column({ type: 'int' })
  count: number;

  @Column({ type: 'bigint', unsigned: true })
  productId: number;

  @ManyToOne(() => ProductEntity, (x) => x.info)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @OneToMany(() => BasketEntity, (x) => x.productInfo)
  basket: BasketEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIInfo(iInfo: IInfo): InfoEntity {
    if (!iInfo) {
      return null;
    }

    const info = new InfoEntity();

    info.colorId = +iInfo.color.id;
    info.count = iInfo.count;
    info.sizeId = +iInfo.size.id;
    info.productId = Number(iInfo.product.id);

    return info;
  }
  static toIInfoEntity(info: InfoEntity): IInfoEntity {
    if (!info) {
      return null;
    }

    return {
      id: info.id.toString(),
      size: info.size
        ? SizeEntity.toISizeEntity(info.size)
        : { id: info.sizeId.toString() },
      color: info.color
        ? ColorEntity.toIColorEntity(info.color)
        : { id: info.colorId.toString() },
      count: info.count,
      product: info.product
        ? ProductEntity.toIProductEntity(info.product)
        : { id: info.productId.toString() },
      basket: [],
      createdAt: info.createdAt,
      updatedAt: info.updatedAt,
    };
  }
}
