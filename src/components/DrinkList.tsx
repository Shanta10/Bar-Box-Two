import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import '../styles/styles.css';

interface Drink {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface DrinkListProps {
  drinks: Drink[];
  selectedDrink: number | null;
  handleDrinkSelect: (id: number) => void;
}

const DrinkList: React.FC<DrinkListProps> = ({ drinks, selectedDrink, handleDrinkSelect }) => {
  return (
    <Grid container spacing={2}>
      {drinks.map((drink) => (
        <Grid item xs={4} key={drink.id}>
          <Box
            border={1}
            borderColor="grey.400"
            borderRadius={5}
            p={2}
            textAlign="center"
            className={`drink-container ${selectedDrink === drink.id ? 'selected' : ''}`}
            onClick={() => handleDrinkSelect(drink.id)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={drink.image} 
              alt={drink.name} 
              className={`drink-image ${selectedDrink === drink.id ? 'selected' : ''}`} 
              style={{ marginBottom: '10px' }}
            />
            <Typography>{drink.name}</Typography>
            <Typography>Valor Bebida Full: ${drink.price}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default DrinkList;
