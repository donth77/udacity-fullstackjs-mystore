import { Product } from './Product';

export class CartProduct extends Product {
  quantity: number;
  totalPriceStr: string;

  constructor() {
    super();
    this.quantity = 0;
    this.totalPriceStr = '';
  }
}
