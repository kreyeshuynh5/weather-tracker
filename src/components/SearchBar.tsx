import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

type SearchBarProps = {
  onSearch: (city: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>("");

  const handleSearch = () => {
    if (city.trim()) onSearch(city);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Enter city name"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Stack>
  );
};

export default SearchBar;
