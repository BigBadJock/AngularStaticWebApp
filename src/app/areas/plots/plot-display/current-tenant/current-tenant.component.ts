import { Component, Input, OnInit } from '@angular/core';
import { PlotRentalHistory } from 'src/app/models/plotRentalHistory.model';

@Component({
  selector: 'app-current-tenant',
  templateUrl: './current-tenant.component.html',
  styleUrls: ['./current-tenant.component.scss']
})
export class CurrentTenantComponent  {
  @Input() tenant: PlotRentalHistory;

  constructor() { }

  ngOnInit(): void {
  }

}
