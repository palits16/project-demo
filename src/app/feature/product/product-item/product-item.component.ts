import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product;
  @Output() addProduct = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  addToCart(product) {
    this.addProduct.emit(product);
  }

}
