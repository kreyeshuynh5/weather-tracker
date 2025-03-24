import { List, ListItem, ListItemText, Button } from "@mui/material";

type FavoritesListProps = {
  favorites: string[];
  onSelect: (city: string) => void;
};

const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, onSelect }) => {
  return (
    <List>
      {favorites.map((city, index) => (
        <ListItem key={index}>
          <ListItemText primary={city} sx={{ color: "black" }} />
          <Button variant="contained" onClick={() => onSelect(city)} >
            View
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default FavoritesList;
