import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupShellComponent } from './signup-shell/signup-shell.component';
import { SignupDisplayComponent } from './signup-display/signup-display.component';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [SignupShellComponent, SignupDisplayComponent],
  imports: [CommonModule, ReactiveFormsModule, SignupRoutingModule, HttpClientModule],
  providers: [AuthService],
})
export class SignupModule {}
