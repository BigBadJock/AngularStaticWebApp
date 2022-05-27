import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingListCreateRoutingModule } from './waiting-list-create-routing.module';
import { WaitingListCreateShellComponent } from './waiting-list-create-shell/waiting-list-create-shell.component';
import { WaitingListCreateDisplayComponent } from './waiting-list-create-display/waiting-list-create-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WaitingListCreateShellComponent,
    WaitingListCreateDisplayComponent
  ],
  imports: [
    CommonModule,
    WaitingListCreateRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
  ]
})
export class WaitingListCreateModule { }
