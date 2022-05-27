import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';

import { AddressService } from 'src/app/services/address.service';
import { SetupRoutingModule } from './setup-routing.module';
import { SetupShellComponent } from './setup-shell/setup-shell.component';
import { SetupDisplayComponent } from './setup-display/setup-display.component';

@NgModule({
  declarations: [SetupShellComponent, SetupDisplayComponent],
  imports: [CommonModule, SetupRoutingModule, ReactiveFormsModule, ArchwizardModule],
  providers: [AddressService],
})
export class SetupModule {}
