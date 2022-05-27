import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { MockComponent } from 'ng-mocks';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { CurrentWeather } from '../models/current-weather.model';
import { OpenWeatherService } from '../services/open-weather.service';

import { CurrentWeatherComponent } from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let service: OpenWeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent, MockComponent(CardComponent)],
      imports: [HttpClientModule],
      providers: [OpenWeatherService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    service = TestBed.get(OpenWeatherService);
    fixture.detectChanges();
  });

  it('should create', () => {
    const currentWeather = new CurrentWeather();
    currentWeather.coord = { lon: 1, lat: 1 };
    currentWeather.weather = [
      {
        id: 1,
        main: 'cloudy',
        description: 'cloudy',
        icon: '09d',
      },
    ];
    currentWeather.base = '';
    currentWeather.main = {
      temp: 12,
      feels_like: 12,
      temp_min: 5,
      temp_max: 12,
      pressure: 1,
      humidity: 1,
    };
    currentWeather.id = 1;
    currentWeather.dt = null;
    currentWeather.name = 'name';
    currentWeather.timezone = 'GMT';

    const response = cold('-a-b-c|', { a: currentWeather, b: currentWeather, c: currentWeather });

    service.weatherForecast = jest.fn(() => response);

    expect(component).toBeTruthy();
  });
});
