import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeather, WeatherDescription } from '../models/current-weather.model';
import { OpenWeatherService } from '../services/open-weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  @Input() town: string;

  currentWeather: CurrentWeather;

  weatherDescription: WeatherDescription;

  icon: string;

  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit(): void {
    this.openWeatherService.currentWeather(this.town).subscribe(
      (result: CurrentWeather) => {
        this.currentWeather = result as CurrentWeather;
        // eslint-disable-next-line prefer-destructuring
        this.weatherDescription = this.currentWeather.weather[0];
        this.icon = this.getIcon();
      },
      (error) => {
        console.log(`Error:${error}`);
      },
    );
  }

  private getIcon() {
    let icon = '';
    switch (this.weatherDescription.icon) {
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
}
