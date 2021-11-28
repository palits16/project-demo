import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartUtilityService } from 'src/app/shared/services/cart-utility.service';
import { CheckoutUtilityService } from 'src/app/shared/services/checkout-utility.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products = [];
  formGroup: FormGroup;
  constructor(
    private cartUtilityService: CartUtilityService,
    private checkoutUtilityService: CheckoutUtilityService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.cartUtilityService.getCart().subscribe(value => {
      this.products = [...value];
    });
    this.formGroup = new FormGroup({
      products: new FormArray([])
    });

    let productsFormArray: FormArray = <FormArray>(this.formGroup.get('products'));
    while (productsFormArray.length != 0) {
      productsFormArray.removeAt(0);
    }
    this.products.forEach((product) => {
      productsFormArray.push(
        new FormGroup({
          name: new FormControl(product.name),
          description: new FormControl(product.description),
          quantity: new FormControl(product.quantity),
          price: new FormControl(product.price),
          img: new FormControl(product.img),
          isChecked: new FormControl(product.isChecked)
        })
      );
    });
  }

  checkout(): void {
    const selectedProducts = this.formGroup.value.products;
    const checkoutProducts = selectedProducts.filter(({ isChecked }) => isChecked);
    this.checkoutUtilityService.updateCheckout(checkoutProducts);
    this.router.navigate(['/checkout']);
  }

  get total(): number {
    const selectedProducts = this.formGroup.value.products;
    const checkoutProducts = selectedProducts.filter(({ isChecked }) => isChecked);
    return checkoutProducts.reduce((acc, prod) => acc+= (prod.price * prod.quantity) ,0)
  }

  get hasChekoutProducts(): boolean {
    const selectedProducts = this.formGroup.value.products;
    const checkoutProducts = selectedProducts.filter(({ isChecked }) => isChecked);

    return checkoutProducts.length > 0;
  }

}
