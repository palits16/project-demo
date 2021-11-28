import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import(`./feature/product/product.module`)
    .then(module => module.ProductModule)
  },
  { 
    path: 'cart', 
    loadChildren: () => import(`./feature/cart/cart.module`)
    .then(module => module.CartModule)
  },
  { 
    path: 'checkout', 
    loadChildren: () => import(`./feature/checkout/checkout.module`)
    .then(module => module.CheckoutModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
