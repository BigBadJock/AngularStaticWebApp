import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentSearchShellComponent } from './components/payment-search-shell/payment-search-shell.component';

const routes: Routes = [{ path: '', component: PaymentSearchShellComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentSearchRoutingModule {}
