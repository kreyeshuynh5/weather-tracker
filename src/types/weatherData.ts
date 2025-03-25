export type WeatherData = {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  main: { temp: number; humidity: number };
  weather: { description: string }[];
  wind: { speed: number };
};
