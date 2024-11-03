import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { IBasket, IBasketEntity } from '../../../models/basket.model';
import { InfoEntity } from './info.entity';

@Entity('basket')
export class BasketEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'bigint', unsigned: true })
  productId: number;

  @ManyToOne(() => ProductEntity, (product) => product.basket)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column({ type: 'bigint', unsigned: true })
  productInfoId: number;

  @ManyToOne(() => InfoEntity, (x) => x.basket)
  @JoinColumn({ name: 'infoId' })
  productInfo: InfoEntity;

  @Column({ type: 'int' })
  count: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIBasket(iBasket: IBasket): BasketEntity {
    if (!iBasket) {
      return null;
    }

    const basket = new BasketEntity();

    basket.count = iBasket.count;
    basket.userId = Number(iBasket.userId);
    basket.productId = Number(iBasket.product.id);
    basket.productInfoId = Number(iBasket.info.id);

    return basket;
  }

  static toIBasketEntity(basket: BasketEntity): IBasketEntity {
    if (!basket) {
      return null;
    }

    return {
      id: basket.id.toString(),
      userId: basket.userId.toString(),
      product: basket.product
        ? ProductEntity.toIProductEntity(basket.product)
        : { id: basket.productId.toString() },
      info: basket.productInfo
        ? InfoEntity.toIInfoEntity(basket.productInfo)
        : { id: basket.productInfoId.toString() },
      count: basket.count,
      createdAt: basket.createdAt,
      updatedAt: basket.updatedAt,
    };
  }
}
