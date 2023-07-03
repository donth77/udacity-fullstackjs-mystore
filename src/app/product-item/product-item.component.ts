import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product: Product;

  constructor(private cartService: CartService) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
    };
  }

  getUrl() {
    return `url('${this.product.url}')`;
  }

  addToCart() {
    this.cartService.addToCart(this.product, 1);
  }
}
