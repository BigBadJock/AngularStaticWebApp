import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurrentWeather } from '../models/current-weather.model';
import { WeatherForecast } from '../models/weather-forecast';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherService {
  private baseUrl = '/openweathermap/';

  private currentForecastUrl = 'weather?q=';

  private apiKey = environment.openWeatherAPIKey;

  constructor(private http: HttpClient) {}

  currentWeather(town: string) {
    const url = `${this.baseUrl}${this.currentForecastUrl}${town},GB&units=metric&appid=${this.apiKey}`;
    return this.http.get<CurrentWeather>(url).pipe(
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  weatherForecast(lat: number, lon: number) {
    const url = `${this.baseUrl}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${this.apiKey}`;
    return this.http.get<WeatherForecast>(url).pipe(
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }
}
