import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Size } from '../../../enum/size.enum';
import { ProductEntity } from './product.entity';
import { IInfo, IInfoEntity } from '../../../models/info.model';

@Entity('info')
export class InfoEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  color: string;

  @Column({ type: 'enum', enum: Size })
  size: Size;

  @Column({ type: 'int' })
  count: number;

  @Column({ type: 'bigint', unsigned: true })
  productId: number;

  @ManyToOne(() => ProductEntity, (x) => x.info)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIInfo(iInfo: IInfo): InfoEntity {
    if (!iInfo) {
      return null;
    }

    const info = new InfoEntity();

    info.color = iInfo.color;
    info.count = iInfo.count;
    info.size = iInfo.size;
    info.productId = Number(iInfo.product.id);

    return info;
  }
  static toIInfoEntity(info: InfoEntity): IInfoEntity {
    if (!info) {
      return null;
    }

    return {
      id: info.id.toString(),
      size: info.size,
      color: info.color,
      count: info.count,
      product: info.product
        ? ProductEntity.toIProductEntity(info.product)
        : { id: info.productId.toString() },
      createdAt: info.createdAt,
      updatedAt: info.updatedAt,
    };
  }
}
