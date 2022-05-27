import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentSearchRoutingModule } from './payment-search-routing.module';
import { PaymentSearchShellComponent } from './components/payment-search-shell/payment-search-shell.component';

@NgModule({
  declarations: [PaymentSearchShellComponent],
  imports: [CommonModule, PaymentSearchRoutingModule],
})
export class PaymentSearchModule {}
