import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartUtilityService {
  private cart$ = new BehaviorSubject<any>('');

  addToCart(product): void {
    const currentValue = this.cart$.value;
    let updatedValue = [];
    if (currentValue) {
      const productExistInCart = currentValue.find(({ name }) => name === product.name);
      if (!productExistInCart) {
        currentValue.push({ ...product, quantity: 1, isChecked: false });
      } else {
        productExistInCart.quantity += 1;
      }
      updatedValue = [...currentValue];
    } else {
      product.quantity = 1;
      product.isChecked = false;
      updatedValue.push(product);
    }
    
    this.cart$.next(updatedValue);
  }

  updateQuantityProductToCart(product, quantity): void {
    const currentValue = this.cart$.value;
    let updatedValue = [];
    if (currentValue) {
      const filteredValue = currentValue.find(({ name }) => name === product.name);
      filteredValue.quantity = quantity;
      updatedValue = [...currentValue];
    }
    
    this.cart$.next(updatedValue);
  }

  removeProductToCart(product): void {
    const currentValue = this.cart$.value;
    let updatedValue;
    if (currentValue) {
      const filteredValue = currentValue.filter(({ name }) => name !== product.name);
      updatedValue = [...filteredValue];
    }
    
    this.cart$.next(updatedValue);
  }

  updateCheckState(product) {
    const currentValue = this.cart$.value;
    let updatedValue;
    if (currentValue) {
      const productExistInCart = currentValue.find(({ name }) => name === product.name);
      productExistInCart.isChecked = product.isChecked;
      updatedValue = [...currentValue];
    }
    
    this.cart$.next(updatedValue);
  }

  getCart() {
    return this.cart$.asObservable();
  }

  updateCartState(myChange) {
    this.addToCart(myChange);
  }

  clearCart(): void {
    this.cart$.next('');
  }
}
