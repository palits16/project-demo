import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutUtilityService {
  private state$ = new BehaviorSubject<any>('');

  updateCheckout(myChange) {
    this.state$.next(myChange);
  }

  getLatestState() {
    return this.state$.asObservable();
  }

  clearCheckout(): void {
    this.state$.next('');
  }
}
