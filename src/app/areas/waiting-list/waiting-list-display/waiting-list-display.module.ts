import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingListDisplayShellComponent } from './waiting-list-display-shell/waiting-list-display-shell.component';
import { WaitingListDisplayDisplayComponent } from './waiting-list-display-display/waiting-list-display-display.component';
import { WaitingListDisplayRoutingModule } from './waiting-list-display-routing.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';



@NgModule({
  declarations: [
    WaitingListDisplayShellComponent,
    WaitingListDisplayDisplayComponent
  ],
  imports: [
    CommonModule,
    WaitingListDisplayRoutingModule,
    RouterModule,
    SharedModule,
    NgbModule,

  ]
})
export class WaitingListDisplayModule { }
