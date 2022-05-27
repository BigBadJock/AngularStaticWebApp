import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninShellComponent } from './signin-shell/signin-shell.component';
import { SigninDisplayComponent } from './signin-display/signin-display.component';

@NgModule({
  declarations: [SigninShellComponent, SigninDisplayComponent],
  imports: [CommonModule, ReactiveFormsModule, SigninRoutingModule],
})
export class SigninModule {}
