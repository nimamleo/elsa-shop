export class GetUserBasketRequest {}
export class GetUserBasketItem {
  id: string;
  price: number;
  title: string;
  image: string;
  count: number;
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
