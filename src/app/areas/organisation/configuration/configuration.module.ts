import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationShellComponent } from './configuration-shell/configuration-shell.component';
import { ConfigurationRoutingModule } from './configuration.routing.module';

@NgModule({
  declarations: [ConfigurationShellComponent],
  imports: [CommonModule, ConfigurationRoutingModule],
})
export class ConfigurationModule {}
