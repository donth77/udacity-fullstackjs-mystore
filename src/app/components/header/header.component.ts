import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartTotalNum = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.currentCart.subscribe((products) => {
      this.cartTotalNum = products.reduce((sum, p) => sum + p.quantity, 0);
    });
  }
}
