import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SiteSearchShellComponent } from './site-search-shell/site-search-shell.component';
import { SiteSearchRoutingModule } from './site-search.routing.module';
import { SiteSearchDisplayComponent } from './site-search-display/site-search-display.component';
import { SiteCardComponent } from './site-card/site-card.component';

@NgModule({
  declarations: [SiteSearchShellComponent, SiteSearchDisplayComponent, SiteCardComponent],
  imports: [CommonModule, SiteSearchRoutingModule, RouterModule],
})
export class SiteSearchModule {}
