import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import FavoritesList from "../components/FavoritesList";
import { fetchWeather, fetchWeatherByCoords } from "../api";
import { Button, Stack, Typography } from "@mui/material";

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
    <Stack sx={{ mb: 2, background: "lightblue" }}>
    <div style={{ padding: 50, maxWidth: 900, margin: "auto" }}>
      <Typography variant="h3" pb={3} sx={{ color: "black" }}>
        🌤️ Weather Tracker
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <Button variant="contained" onClick={getLocationWeather}>
        📍 Use My Location
      </Button>
      <WeatherCard weather={weather} onFavorite={handleFavorite} />
      <Typography variant="h5" sx={{ color: "black", marginTop: 2 }}>
        ⭐ Favorite Cities
      </Typography>
      <FavoritesList favorites={favorites} onSelect={handleSearch} />
    </div>
  </Stack>
  );
};

export default Home;