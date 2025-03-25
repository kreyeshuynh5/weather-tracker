import { List, ListItem, ListItemText, Button, IconButton, Typography } from "@mui/material";

type FavoritesListProps = {
  favorites: string[];
  onSelect: (city: string) => void;
  onDelete: (city: string) => void; 
};

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onSelect, onDelete }) => {
  return (
    <List>
      {favorites.map((city, index) => (
        <ListItem key={index}>
          <ListItemText primary={city} sx={{ color: "black" }} />
          <Button sx={{ marginRight: 1 }}variant="contained" onClick={() => onSelect(city)} >
            View
          </Button>
          <IconButton color="error" onClick={() => onDelete(city)}>
            <Typography sx={{ fontSize: 20 }}>🗑️</Typography>
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default FavoritesList;
