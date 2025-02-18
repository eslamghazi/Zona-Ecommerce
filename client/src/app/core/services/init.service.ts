import { AccountService } from './account.service';
import { forkJoin, of } from 'rxjs';
import { CartService } from './cart.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private cartService = inject(CartService);
  private accountService = inject(AccountService);

  init() {
    const cartId = localStorage.getItem('cart_id');
    const cart$ = cartId ? this.cartService.getCart(cartId) : of(null);

    return forkJoin({
      cart: cart$,
      user: this.accountService.getUserInfo()
    })
  }
}
