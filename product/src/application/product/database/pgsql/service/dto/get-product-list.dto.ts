import { ILimitation } from '@common/pagination/limitation.interface';
import { Order } from '@common/type/order';
import { ProductOrderBy } from '../../../../enum/product-order-by.enum';

export class GetProductList {
  limitation: ILimitation;
  productIds: string[];
  colorIds: string[];
  sizeIds: string[];
  price: [number, number];
  orderType: Order;
  orderBy: ProductOrderBy;
}
export class GetProductListDto {}
