import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city: string) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: { q: city, units: "metric", appid: API_KEY },
  });
  return response.data;
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: { lat, lon, units: "metric", appid: API_KEY },
  });
  return response.data;
};
