import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { Repository } from 'typeorm';
import { GetPaymentList } from './dto/get-payment-list.dto';
import { Ok, Result } from '@common/result';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { PaymentOrderBy } from '../../../enum/payment-order-by.enum';
import { IPaymentDatabaseProvider } from '../../provider/payment.provider';

@Injectable()
export class PaymentPgsqlService implements IPaymentDatabaseProvider {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  @HandleError
  async getPaymentProductIds(
    queryable: GetPaymentList,
  ): Promise<Result<[string[], number]>> {
    if (!queryable.orderBy) {
      queryable.orderBy = PaymentOrderBy.SALE;
    }
    if (!queryable.orderType) {
      queryable.orderType = 'DESC';
    }
    const query = this.paymentRepository
      .createQueryBuilder('p')
      .select('p.productId', 'productId')
      .addSelect('count(p.id)', 'sale')
      .groupBy('p.productId');

    switch (queryable.orderBy) {
      case PaymentOrderBy.SALE: {
        query.orderBy('sale', queryable.orderType);
        break;
      }
    }

    const res = await query
      .skip(queryable.limitation.skip)
      .limit(queryable.limitation.limit)
      .getRawMany();

    const count = await query.getCount();

    return Ok([res.map((x) => x['productId']), count]);
  }
}
