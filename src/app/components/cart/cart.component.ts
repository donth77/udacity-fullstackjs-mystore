import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../models/CartProduct';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartProducts: Observable<CartProduct[]> = new Observable<CartProduct[]>();
  totalStr: Observable<string> = new Observable<string>();
  name: string = '';
  expiryMonth: string = '';
  expiryYear: string = '';
  creditCard: string = '';
  cvc: string = '';
  address: string = '';
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartProducts = this.cartService.currentCart;
    this.totalStr = this.cartService.cartTotalStr;
  }

  submitCheckout(): void {
    this.cartService.clearCart();
    this.router.navigateByUrl('/success');
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id);
  }

  nameChanged(newName: string) {
    // listen to name change
  }
}
