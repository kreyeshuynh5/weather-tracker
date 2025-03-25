import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { WeatherData } from "../types/weatherData";

type WeatherCardProps = {
  weather: WeatherData | null;
  onFavorite: () => void;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onFavorite }) => {
  if (!weather) return null;

  // Convert UNIX timestamps to readable time format
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card sx={{ maxWidth: 900, mt: 2, border: "black" }}>
      <CardContent>
        <Typography variant="h5">
          {weather.name}, {weather.sys.country}
        </Typography>
        <Typography variant="h6">
          🌡️ {weather.main.temp}°C - {weather.weather[0].description}
        </Typography>
        <Typography variant="body1">💦 Humidity: {weather.main.humidity}%</Typography>
        <Typography variant="body1">🌬️ Wind Speed: {weather.wind.speed} m/s</Typography>
        <Typography variant="body1">🌅 Sunrise: {formatTime(weather.sys.sunrise)}</Typography>
        <Typography variant="body1">🌇 Sunset: {formatTime(weather.sys.sunset)}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={onFavorite}>
          ⭐ Add to Favorites
        </Button>
      </CardActions>
    </Card>
  );
};

export default WeatherCard;
