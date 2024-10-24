import { PaymentStatus } from '../enum/payment-status.enum';
import { IEntity } from '@common/interfaces/entity.interface';
import { IDated } from '@common/interfaces/dated.interface';

export interface IPayment {
  price: number;
  taxPrice: number;
  discountPrice: number;
  totalPrice: number;
  productId: string;
  userId: string;
  status: PaymentStatus;
  discountId?: string;
}

export interface IPaymentEntity extends IPayment, IEntity, IDated {}
