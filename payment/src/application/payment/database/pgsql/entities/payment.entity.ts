import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IPayment, IPaymentEntity } from '../../../models/payment.model';
import { PaymentModule } from '../../../payment.module';
import { PaymentStatus } from '../../../enum/payment-status.enum';

@Entity({ name: 'payment' })
export class PaymentEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  taxPrice: number;

  @Column({ type: 'int', default: 0 })
  discountPrice: number;

  @Column({ type: 'int' })
  totalPrice: number;

  @Column({ type: 'varchar', length: 255 })
  status: PaymentStatus;

  @Column({ type: 'bigint', unsigned: true })
  productId: number;

  @Column({ type: 'bigint', unsigned: true })
  userId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  discountId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIPayment(iPayment: IPayment): PaymentModule {
    if (!iPayment) {
      return null;
    }

    const payment = new PaymentEntity();

    payment.price = iPayment.price;
    payment.taxPrice = iPayment.taxPrice;
    payment.discountPrice = iPayment.discountPrice;
    payment.status = iPayment.status;
    payment.totalPrice = iPayment.totalPrice;
    payment.userId = Number(iPayment.userId);
    payment.productId = Number(iPayment.productId);

    return payment;
  }

  static toIPaymentEntity(payment: PaymentEntity): IPaymentEntity {
    if (!payment) {
      return null;
    }

    return {
      id: payment.id.toString(),
      price: payment.price,
      taxPrice: payment.taxPrice,
      discountPrice: payment.discountPrice,
      totalPrice: payment.totalPrice,
      status: payment.status,
      userId: payment.userId.toString(),
      productId: payment.productId.toString(),
      discountId: payment.discountId.toString(),
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }
}
