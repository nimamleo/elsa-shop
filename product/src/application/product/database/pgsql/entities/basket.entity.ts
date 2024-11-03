import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { IBasket, IBasketEntity } from '../../../models/basket.model';

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
      count: basket.count,
      createdAt: basket.createdAt,
      updatedAt: basket.updatedAt,
    };
  }
}
