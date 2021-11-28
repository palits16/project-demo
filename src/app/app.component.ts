import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartUtilityService } from './shared/services/cart-utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo-project';
  cartProductList = [];
  currentRoute = '/'

  constructor(private cartUtilityService: CartUtilityService, router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = router.url;
      }
    });
  }

  ngOnInit(): void {
    this.cartUtilityService.getCart().subscribe(cartValue => {
      this.cartProductList = [...cartValue];
    });
    this.cartProductList.forEach((cartValue) => {
      if (typeof cartValue == 'object') {
        this.addProductToCart(cartValue);
      }
    });
  }

  addProductToCart(product) {
    const productExistInCart = this.cartProductList.find(({ name }) => name === product.name);
    if (!productExistInCart) {
      this.cartProductList.push({ ...product, quantity: 1 });
      return;
    }
    productExistInCart.quantity += 1;
  }

  get total(): number {
    return this.cartProductList.reduce((total, product) => total += product.quantity ,0);
  }

}
