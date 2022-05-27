import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingListUpdateShellComponent } from './waiting-list-update-shell/waiting-list-update-shell.component';
import { WaitingListUpdateDisplayComponent } from './waiting-list-update-display/waiting-list-update-display.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WaitingListUpdateShellComponent,
    WaitingListUpdateDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,     
  ]
})
export class WaitingListUpdateModule { }
