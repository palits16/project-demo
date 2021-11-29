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
  }

  get total(): number {
    return this.cartProductList.reduce((total, product) => total += product.quantity ,0);
  }

}
