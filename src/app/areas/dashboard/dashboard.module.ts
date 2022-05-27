import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { OpenWeatherWidgetModule } from 'src/app/utilities/open-weather-widget/open-weather-widget.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardShellComponent } from './components/dashboard-shell/dashboard-shell.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardSiteInfoComponent } from './components/dashboard-site-info/dashboard-site-info.component';
import { DashboardEffects } from './store/dashboard.effects';
import * as fromDashboard from './store/dashboard.reducer';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  declarations: [DashboardShellComponent, DashboardSiteInfoComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    OpenWeatherWidgetModule,
    EffectsModule.forFeature([DashboardEffects]),
    StoreModule.forFeature(fromDashboard.dashboardFeatureKey, fromDashboard.reducer),
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
