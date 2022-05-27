import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
import { WeatherForecast } from '../models/weather-forecast';
import { WeatherPoint } from '../models/weather-point';
import { OpenWeatherService } from '../services/open-weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  @Input() lat: number;

  @Input() lon: number;

  forecast: WeatherForecast;

  current: WeatherPoint;

  currentDate: Date;

  currentDay: string;

  dailyForecasts: WeatherPoint[];

  static getIcon(oldIcon: string) {
    let icon = '';
    switch (oldIcon) {
      case '11d':
        icon = 'fas fa-bolt';
        break;
      case '09d':
        icon = 'fas fa-cloud-showers-heavy';
        break;
      case '10d':
        icon = 'fas fa-cloud-sun-rain';
        break;
      case '13d':
        icon = 'fas fa-snowflake';
        break;
      case '50d':
        icon = 'fas fa-smog';
        break;
      case '01n':
        icon = 'fas fa-moon';
        break;
      case '02n':
        icon = 'fas fa-cloud-moon';
        break;
      case '04n':
        icon = 'fas fa-cloud-moon';
        break;
      case '10n':
        icon = 'fas fa-cloud-moon-rain';
        break;
      default:
        icon = 'fas fa-sun';
        break;
    }
    return icon;
  }

  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit(): void {
    this.openWeatherService.weatherForecast(this.lat, this.lon).subscribe(
      (forecast: WeatherForecast) => {
        this.forecast = forecast;
        this.current = forecast.current;
        this.currentDate = new Date(this.current.dt * 1000);
        this.currentDay = moment(this.currentDate).format('ddd');
        this.current.newIcon = ForecastComponent.getIcon(this.forecast.current.weather[0].icon);

        this.dailyForecasts = [];
        this.forecast.daily.forEach((d: WeatherPoint) => {
          const nd = d;
          nd.newIcon = ForecastComponent.getIcon(d.weather[0].icon);
          nd.day = moment(d.dt * 1000).format('ddd');
          this.dailyForecasts.push(nd);
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
