import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordShellComponent } from './reset-password-shell/reset-password-shell.component';
import { ResetPasswordDisplayComponent } from './reset-password-display/reset-password-display.component';

@NgModule({
  declarations: [ResetPasswordShellComponent, ResetPasswordDisplayComponent],
  imports: [CommonModule, ResetPasswordRoutingModule, ReactiveFormsModule],
})
export class ResetPasswordModule {}
