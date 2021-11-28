import { Component, Input, OnInit } from '@angular/core';
import { CartUtilityService } from 'src/app/shared/services/cart-utility.service';
import { products } from './product.const';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  productList = products;

  constructor(private cartUtilityService: CartUtilityService) { }

  addToCart(value): void {
    this.cartUtilityService.addToCart(value);
  }

}
