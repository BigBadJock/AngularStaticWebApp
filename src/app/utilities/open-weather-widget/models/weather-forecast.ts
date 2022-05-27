import { WeatherPoint } from './weather-point';

export class WeatherForecast {
  lat: number;

  lon: number;

  timezone: string;

  timezone_offset: number;

  current: WeatherPoint;

  daily: WeatherPoint[];
}
