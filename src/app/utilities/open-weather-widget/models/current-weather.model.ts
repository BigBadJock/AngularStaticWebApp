export interface Coordinates {
  lon: number;
  lat: number;
}

export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainPoint {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export class CurrentWeather {
  coord: Coordinates;

  weather: WeatherDescription[];

  base: string;

  main: MainPoint;

  id: number;

  dt: Date;

  name: string;

  timezone: string;
}
