import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlotUpdateRoutingModule } from './plot-update-routing.module';
import { PlotUpdateShellComponent } from './plot-update-shell/plot-update-shell.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PlotUpdateDisplayComponent } from './plot-update-display/plot-update-display.component';

@NgModule({
  declarations: [
    PlotUpdateShellComponent,
    PlotUpdateDisplayComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    PlotUpdateRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
  ]
})
  
export class PlotUpdateModule { }
