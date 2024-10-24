import { Result } from '@common/result';
import { GetPaymentList } from '../pgsql/services/dto/get-payment-list.dto';

export interface IPaymentReader {
  getPaymentProductIds(
    queryable: GetPaymentList,
  ): Promise<Result<[string[], number]>>;
}

export interface IPaymentWriter {}

export interface IPaymentDatabaseProvider
  extends IPaymentReader,
    IPaymentWriter {}

export const PAYMENT_DATABASE_PROVIDER = 'payment-database-provider';
