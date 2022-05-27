export interface Temp {
  name: string;
  value: number;
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temp[];
  weather: WeatherDescription;
}
