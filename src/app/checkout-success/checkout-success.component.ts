import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css'],
})
export class CheckoutSuccessComponent {
  constructor() {}

  ngOnInit() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}
