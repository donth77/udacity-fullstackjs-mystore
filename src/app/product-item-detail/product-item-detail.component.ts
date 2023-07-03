import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent {
  id: number | null = null;
  product: Product;
  quantity: number = 0;
  buttonEnabled = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.productService.getProducts().subscribe((res) => {
      this.product = res.filter((prod) => prod.id === this.id)[0];
    });
  }

  getUrl() {
    return `url('${this.product?.url || ''}')`;
  }

  addQuantity() {
    this.quantity++;
    if (this.quantity > 0) {
      this.buttonEnabled = true;
    }
  }

  subQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }

    if (this.quantity <= 0) {
      this.buttonEnabled = false;
    }
  }

  addToCart() {
    if (this.buttonEnabled) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }
}
