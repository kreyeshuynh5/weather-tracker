import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import FavoritesList from "../components/FavoritesList";
import { fetchWeather, fetchWeatherByCoords } from "../api";

type WeatherData = {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: { description: string }[];
};

const Home: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const handleSearch = async (city: string) => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleFavorite = () => {
    if (!weather) return;
    const updatedFavorites = [...new Set([...favorites, weather.name])]; // Avoid duplicates
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const getLocationWeather = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeather(data);
        } catch (error) {
          console.error("Error fetching location weather:", error);
        }
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
        <h1>🌤️ Weather Tracker</h1>
        <SearchBar onSearch={handleSearch} />
        <button onClick={getLocationWeather}>📍 Use My Location</button>
        <WeatherCard weather={weather} onFavorite={handleFavorite} />
        <h2>⭐ Favorite Cities</h2>
        <FavoritesList favorites={favorites} onSelect={handleSearch} />
    </div>
  );
};

export default Home;