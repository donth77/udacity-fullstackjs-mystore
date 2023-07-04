import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct } from 'src/app/models/CartProduct';
import { CartComponent } from '../cart.component';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent {
  @Input() product: CartProduct = new CartProduct();
  @Output() removeProductFromCart: EventEmitter<number> = new EventEmitter();

  updateQuantity = new FormControl(0);

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateQuantity = new FormControl(this.product.quantity);
  }

  submitUpdateQuantity(): void {
    const newQuantity = this.updateQuantity.value;
    if (newQuantity) {
      this.cartService.setQuantity(this.product.id, newQuantity);
    }
  }

  removeFromCart(): void {
    this.removeProductFromCart.emit(this.product.id);
  }
}
