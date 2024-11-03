export class GetUserBasketRequest {}
export class GetUserBasketItem {
  id: string;
  price: string;
  title: string;
  image: string;
  count: string;
  size: string;
  color: string;
  quality: string;
  country: string;
}
export class GetUserBasketResponse {
  list: GetUserBasketItem[];
  price: number;
  taxPrice: number;
  totalPrice: number;
}
