import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/Product';
import { CartProduct } from '../models/CartProduct';
import { MAX_QUANTITY } from '../constants';

const STORAGE_KEY = 'cart';

const toastOptions = {
  timeOut: 1000,
  positionClass: 'toast-top-center-offset',
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  currentCart: BehaviorSubject<CartProduct[]>;
  cartTotalStr: BehaviorSubject<string>;

  constructor(private toastr: ToastrService) {
    const cartArr = Array.from(this.getCart().values());
    this.currentCart = new BehaviorSubject<CartProduct[]>(cartArr);
    this.cartTotalStr = new BehaviorSubject<string>(this.getTotalStr(cartArr));
  }

  getCart(): Map<number, CartProduct> {
    const cartStorage = window.localStorage.getItem(STORAGE_KEY);
    return cartStorage ? new Map(JSON.parse(cartStorage)) : new Map();
  }

  saveCart(cart: Map<number, CartProduct>) {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(Array.from(cart.entries()))
    );
  }

  getLocaleStr(num: number) {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  getTotalStr(cartArr: CartProduct[]) {
    return this.getLocaleStr(
      Number(
        cartArr.map((p) => p.quantity * p.price).reduce((sum, p) => sum + p, 0)
      )
    );
  }

  addToCart(product: Product, addQuantity: number) {
    if (addQuantity > MAX_QUANTITY) {
      this.toastr.error(
        'Failed to add to cart',
        'Quantity too large',
        toastOptions
      );
      return;
    } else if (addQuantity < 0) {
      this.toastr.error(
        'Failed to add to cart',
        'Invalid quantity',
        toastOptions
      );
      return;
    }
    const cart = this.getCart();
    const newQuantity = (cart.get(product.id)?.quantity || 0) + addQuantity;
    const newCartProd: CartProduct = {
      ...product,
      quantity: newQuantity,
      totalPriceStr: this.getLocaleStr(Number(product.price * newQuantity)),
    };
    cart.set(product.id, newCartProd);
    const cartArr = Array.from(cart.values());
    this.currentCart.next(cartArr);
    this.saveCart(cart);

    this.cartTotalStr.next(this.getTotalStr(cartArr));

    this.toastr.success(
      `${addQuantity > 1 ? `${addQuantity} ` : ''}${
        product.name
      } added to cart`,
      '',
      toastOptions
    );
  }

  setQuantity(id: number, quantity: number) {
    if (quantity > MAX_QUANTITY) {
      this.toastr.error('Quantity too large', 'Failed to update', toastOptions);
      return;
    } else if (quantity < 1) {
      this.toastr.error('Invalid quantity', 'Failed to update', toastOptions);
      return;
    }
    const cart = this.getCart();
    const product = cart.get(id);
    if (product) {
      const newCartProd: CartProduct = {
        ...product,
        quantity: quantity,
        totalPriceStr: this.getLocaleStr(Number(product.price * quantity)),
      };
      cart.set(product.id, newCartProd);
      const cartArr = Array.from(cart.values());
      this.currentCart.next(cartArr);
      this.saveCart(cart);

      this.cartTotalStr.next(this.getTotalStr(cartArr));

      this.toastr.success(
        `Updated ${product.name} quantity to ${quantity}`,
        '',
        toastOptions
      );
    }
  }

  removeFromCart(id: number) {
    const newCart = this.getCart();
    const product = newCart.get(id);
    newCart.delete(id);

    const cartArr = Array.from(newCart.values());
    this.currentCart.next(cartArr);
    this.saveCart(newCart);

    this.cartTotalStr.next(this.getTotalStr(cartArr));
    if (product) {
      this.toastr.success(
        `Removed ${product.quantity} ${product.name}`,
        '',
        toastOptions
      );
    }
  }
  clearCart(): void {
    window.localStorage.clear();
    this.currentCart.next([]);
    this.cartTotalStr.next('0.00');
  }
}
