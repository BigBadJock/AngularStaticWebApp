import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';

@NgModule({
  declarations: [CurrentWeatherComponent, ForecastComponent],
  imports: [CommonModule, SharedModule],
  exports: [CurrentWeatherComponent, ForecastComponent],
})
export class OpenWeatherWidgetModule {}
