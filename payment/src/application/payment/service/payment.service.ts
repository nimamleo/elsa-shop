import { Inject, Injectable } from '@nestjs/common';
import {
  IPaymentDatabaseProvider,
  PAYMENT_DATABASE_PROVIDER,
} from '../database/provider/payment.provider';
import { Err, Ok, Result } from '@common/result';
import { IPaginatedResult } from '@common/pagination/paginated-result.interface';
import { ILimitation } from '@common/pagination/limitation.interface';
import { PaymentOrderBy } from '../enum/payment-order-by.enum';
import { PaginationResult } from '@common/pagination/paginatio-result';
import { Order } from '@common/type/order';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_DATABASE_PROVIDER)
    private readonly paymentDatabaseProvider: IPaymentDatabaseProvider,
  ) {}

  async getPaymentProductIds(
    limitation: ILimitation,
    orderType: Order,
    orderBy: PaymentOrderBy,
  ): Promise<Result<IPaginatedResult<string>>> {
    const res = await this.paymentDatabaseProvider.getPaymentProductIds({
      limitation: limitation,
      orderBy: orderBy,
      orderType: orderType,
    });
    if (res.isError()) {
      return Err(res.err);
    }

    return Ok(new PaginationResult(res.value[0], res.value[1], limitation));
  }
}
