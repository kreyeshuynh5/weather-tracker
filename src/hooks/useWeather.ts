import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api";

export const useWeather = (city: string) => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: async () => {
      if (!city) return null; // Prevents fetching with empty city
      return await fetchWeather(city);
    },
    enabled: Boolean(city), // Ensures query only runs if city is provided
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry failed requests twice
  });
};
