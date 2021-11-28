import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartUtilityService } from 'src/app/shared/services/cart-utility.service';
import { CheckoutUtilityService } from 'src/app/shared/services/checkout-utility.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutProducts = [];
  constructor(
    private cartUtilityService: CartUtilityService,
    private checkoutUtilityService: CheckoutUtilityService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkoutUtilityService.getLatestState().subscribe(value => {
      this.checkoutProducts = [...value];
    });
  }

  get total(): number {
    return this.checkoutProducts.reduce((acc, prod) => acc+= (prod.price * prod.quantity) ,0)
  }

  placeOrder(): void {
    this.cartUtilityService.clearCart();
    this.checkoutUtilityService.clearCheckout();
    this.router.navigate(['/']);
  }
}
