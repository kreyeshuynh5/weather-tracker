import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import FavoritesList from "../components/FavoritesList";
import { fetchWeather, fetchWeatherByCoords } from "../api";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { WeatherData } from "../types/weatherData";

const Home: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const handleSearch = async (city: string) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      setErrorMessage(axiosError.response?.data?.message || "Failed to fetch weather.");
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = () => {
    if (!weather) return;
    const updatedFavorites = [...new Set([...favorites, weather.name])]; // Avoid duplicates
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleDeleteFavorite = (city: string) => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const getLocationWeather = () => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by this browser.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setErrorMessage(null);
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeather(data);
        } catch (error: unknown) {
          const axiosError = error as AxiosError<{ message: string }>;
          if (axiosError.response?.data?.message) {
                  setErrorMessage(axiosError.response.data.message);
          } else {
            setErrorMessage("Failed to fetch weather by location.");
          }
        }
      },
      (error) => {
        setErrorMessage(`Error getting location: ${error.message}`);
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
      {errorMessage && (
          <Typography variant="body1" sx={{ color: "red", mt: 1 }}>
            {errorMessage}
          </Typography>
        )}
      <Button variant="contained" onClick={getLocationWeather}>
        📍 Use My Location
      </Button>
      {loading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ mt: 3 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 1 }}>Loading weather...</Typography>
          </Stack>
        ) : (
          <WeatherCard weather={weather} onFavorite={handleFavorite} />
        )}
      <Typography variant="h5" sx={{ color: "black", marginTop: 2 }}>
        ⭐ Favorite Cities
      </Typography>
      <FavoritesList favorites={favorites} onSelect={handleSearch} onDelete={handleDeleteFavorite} />
    </div>
  </Stack>
  );
};

export default Home;