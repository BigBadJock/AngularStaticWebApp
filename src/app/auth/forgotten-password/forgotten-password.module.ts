import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgottenPasswordRoutingModule } from './forgotten-password-routing.module';
import { ForgottenPasswordShellComponent } from './forgotten-password-shell/forgotten-password-shell.component';
import { ForgottenPasswordDisplayComponent } from './forgotten-password-display/forgotten-password-display.component';

@NgModule({
  declarations: [ForgottenPasswordShellComponent, ForgottenPasswordDisplayComponent],
  imports: [CommonModule, ForgottenPasswordRoutingModule, ReactiveFormsModule, NgbAlertModule],
})
export class ForgottenPasswordModule {}
