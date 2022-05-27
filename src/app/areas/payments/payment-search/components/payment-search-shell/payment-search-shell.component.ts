import { Component } from '@angular/core';
import { Breadcrumb } from 'src/app/theme/shared/components/breadcrumb/models/breadcrumb.model';
import { BreadcrumbService } from 'src/app/theme/shared/components/breadcrumb/services/breadcrumb.service';

@Component({
  selector: 'app-payment-search-shell',
  templateUrl: './payment-search-shell.component.html',
  styleUrls: ['./payment-search-shell.component.scss'],
})
export class PaymentSearchShellComponent {
  constructor(private breadCrumbService: BreadcrumbService) {
    this.breadCrumbService.add(new Breadcrumb('Billing', '/payments'));
  }
}
