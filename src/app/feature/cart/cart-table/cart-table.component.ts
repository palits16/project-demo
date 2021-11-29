import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CartUtilityService } from 'src/app/shared/services/cart-utility.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
  @Input() formGroup: FormGroup;
  constructor(private cartUtilityService: CartUtilityService) { }

  ngOnInit(): void {
  }

  productsFormArray(): Array<FormGroup> {
    return <Array<FormGroup>>(<FormArray>this.formGroup.get('products')).controls;
  }

  plusMinus(index: number, action: 'minus'|'plus'| 'override', currentValue?: number) {
    let productsFormArray: FormArray = <FormArray>(this.formGroup.get('products'));
    const productFormGroup = productsFormArray.controls[index];
    if ((action === 'minus' || action === 'override') && currentValue <= 1) {
      productFormGroup.get('quantity').setValue(1);
      return;
    }
    if (action === 'override') {
      this.cartUtilityService.updateQuantityProductToCart(productFormGroup.value, productFormGroup.get('quantity').value);
    } else {
      const newValue = (action === 'plus') ? currentValue+= 1 : currentValue -= 1;
      productFormGroup.get('quantity').setValue(newValue);
      this.cartUtilityService.updateQuantityProductToCart(productFormGroup.value, newValue);
    }
  }

  onClickRemoveProduct(index: number): void {
    let productsFormArray: FormArray = <FormArray>(this.formGroup.get('products'));
    const productFormGroup = productsFormArray.controls[index];
    this.cartUtilityService.removeProductToCart(productFormGroup.value);
    (<FormArray>this.formGroup.get('products')).removeAt(index);
  }

  isCheckProduct(index, status: boolean) {
    let productsFormArray: FormArray = <FormArray>(this.formGroup.get('products'));
    const productFormGroup = productsFormArray.controls[index];
    productFormGroup.get('isChecked').setValue(status);
    this.cartUtilityService.updateCheckState(productFormGroup.value);
  }

}
