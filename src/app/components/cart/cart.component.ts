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
  cartTotalNum = 0;
  name: string = '';
  creditCard: string = '';
  address: string = '';
  showNameError = false;
  showAddressError = false;
  showCreditCardError = false;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartProducts = this.cartService.currentCart;
    this.totalStr = this.cartService.cartTotalStr;
    this.cartService.currentCart.subscribe((products) => {
      this.cartTotalNum = products.reduce((sum, p) => sum + p.quantity, 0);
    });
  }

  submitCheckout(): void {
    this.cartService.clearCart();
    this.router.navigateByUrl('/success');
  }

  removeFromCart(id: number): void {
    this.cartService.removeFromCart(id);
  }

  nameChanged(newName: string) {
    if (newName.length && newName.length < 8) {
      this.showNameError = true;
    } else {
      this.showNameError = false;
    }
  }

  addressChanged(newAddress: string) {
    if (newAddress.length && newAddress.length < 8) {
      this.showAddressError = true;
    } else {
      this.showAddressError = false;
    }
  }

  creditCardChanged(newCreditCard: string) {
    if (
      (newCreditCard.length && newCreditCard.length < 16) ||
      isNaN(Number(newCreditCard))
    ) {
      this.showCreditCardError = true;
    } else {
      this.showCreditCardError = false;
    }
  }
}
