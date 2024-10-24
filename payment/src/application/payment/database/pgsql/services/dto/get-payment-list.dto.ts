import { Order } from '@common/type/order';
import { PaymentOrderBy } from '../../../../enum/payment-order-by.enum';
import { ILimitation } from '@common/pagination/limitation.interface';

export class GetPaymentList {
  orderBy: PaymentOrderBy;
  orderType: Order;
  limitation: ILimitation;
}
export class GetPaymentListDto {}
