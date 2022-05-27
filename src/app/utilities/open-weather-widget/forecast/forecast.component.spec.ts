import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { MockComponent } from 'ng-mocks';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { WeatherForecast } from '../models/weather-forecast';
import { OpenWeatherService } from '../services/open-weather.service';

import { ForecastComponent } from './forecast.component';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let service: OpenWeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForecastComponent, MockComponent(CardComponent)],
      imports: [HttpClientModule],
      providers: [OpenWeatherService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    service = TestBed.get(OpenWeatherService);
    fixture.detectChanges();
  });

  it('should create', () => {
    const point = {
      dt: 1,
      sunrise: 6,
      sunset: 18,
      temp: 12,
      feels_like: 9,
      pressure: 1,
      humidity: 1,
      dew_point: 1,
      uvi: 1,
      clouds: 1,
      visibility: 1,
      wind_speed: 1,
      wind_deg: 0,
      weather: {
        id: 1,
        main: 'cloudy',
        description: 'cloudy',
        icon: '09d',
      },
      newIcon: '',
      day: '',
    };
    const forecast = new WeatherForecast();
    forecast.current = point;
    forecast.daily = [point];

    const response = cold('-a-b-c|', { a: forecast, b: forecast, c: forecast });

    service.weatherForecast = jest.fn(() => response);

    expect(component).toBeTruthy();
  });
});
