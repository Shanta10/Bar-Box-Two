import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Typography, Box } from '@mui/material';
import '../styles/styles.css';
import DrinkList from '../components/DrinkList';
import PortionList from '../components/PortionList';
import TotalConsumption from '../components/TotalConsumption';
import whiskyImage from '../assets/whisky.jpeg';
import ronImage from '../assets/ron.jpeg';
import sodaImage from '../assets/pepsi.jpeg';

const drinks = [
  { id: 1, name: 'Soda', image: sodaImage, price: 1 },
  { id: 2, name: 'Ron', image: ronImage, price: 3 },
  { id: 3, name: 'Whisky', image: whiskyImage, price: 5 },
];

const portions = [
  { id: 1, label: 'Poquito', value: 0.25, name: 'Quarter' },
  { id: 2, label: 'Medio medio', value: 0.5, name: 'Half' },
  { id: 3, label: 'Casi lleno', value: 0.75, name: 'ThreeQuarter' },
  { id: 4, label: 'Full', value: 1, name: 'Full' },
];

const SelectionScreen = () => {
  const navigate = useNavigate();
  const [selectedDrink, setSelectedDrink] = useState<number | null>(null);
  const [selectedPortions, setSelectedPortions] = useState<{ [key: number]: number }>({});
  const [selectionOrder, setSelectionOrder] = useState<number[]>([]);

  const handleDrinkSelect = (id: number) => {
    setSelectedDrink(prevSelectedDrink => {
      if (prevSelectedDrink === id) {
        setSelectionOrder(prevOrder => prevOrder.filter(drinkId => drinkId !== id));
        return null;
      } else {
        if (!selectionOrder.includes(id)) {
          if (selectionOrder.length < 3) {
            setSelectionOrder(prevOrder => [...prevOrder, id]);
          }
        }
        return id;
      }
    });
  };

  const handlePortionSelect = (portionId: number) => {
    if (selectedDrink !== null) {
      setSelectedPortions((prevSelectedPortions) => {
        if (prevSelectedPortions[selectedDrink] === portionId) {
          const { [selectedDrink]: _, ...rest } = prevSelectedPortions;
          return rest;
        } else {
          return {
            ...prevSelectedPortions,
            [selectedDrink]: portionId,
          };
        }
      });
    }
  };

  const getTotalSelectedPortion = () => {
    return Object.values(selectedPortions).reduce((total, portionId) => {
      const portion = portions.find(p => p.id === portionId);
      return total + (portion ? portion.value : 0);
    }, 0);
  };

  const calculateTotalCost = () => {
    return Object.entries(selectedPortions).reduce((total, [drinkId, portionId]) => {
      const drink = drinks.find(d => d.id === parseInt(drinkId));
      const portion = portions.find(p => p.id === portionId);
      if (drink && portion) {
        return total + (drink.price * portion.value);
      }
      return total;
    }, 0);
  };

  const handleServeClick = () => {
    const selectedDrinks = drinks.map(drink => {
      const portionId = selectedPortions[drink.id];
      const portion = portions.find(p => p.id === portionId);
      if (portion) {
        return {
          id: drink.id,
          name: drink.name,
          portion: portion.value,
          price: drink.price,
          totalPrice: drink.price * portion.value,
        };
      }
      return null;
    }).filter(drink => drink !== null) as { id: number; name: string; portion: number; price: number; totalPrice: number }[];

    const drinkIds = selectedDrinks.map(drink => drink.id);
    const portionNames = selectedDrinks.map(drink => portions.find(p => p.value === drink.portion)?.name || '');

    const payload = {
      drinkIds: drinkIds,
      portions: portionNames,
      receiptBoolean: null,
    };

    localStorage.setItem('payload', JSON.stringify(payload));
    localStorage.setItem('selectedDrinks', JSON.stringify(selectedDrinks));
    localStorage.setItem('totalCost', calculateTotalCost().toFixed(2));
    console.log('SelectedDrinks:', selectedDrinks);
    console.log('Payload:', payload);
    navigate('/receipt');
  };

  const isPortionDisabled = (portionValue: number) => {
    const currentDrinkPortion = selectedDrink !== null ? selectedPortions[selectedDrink] : 0;
    const currentDrinkValue = portions.find(p => p.id === currentDrinkPortion)?.value || 0;
    return selectedDrink === null || (getTotalSelectedPortion() - currentDrinkValue + portionValue > 1);
  };

  return (
    <Container>
      <Box textAlign="center" bgcolor="#f0f0f0" p={2} mb={3}>
        <Typography variant="h5">
          Elige o combina tu bebida y cantidad
        </Typography>
      </Box>
      <DrinkList 
        drinks={drinks} 
        selectedDrink={selectedDrink} 
        handleDrinkSelect={handleDrinkSelect} 
      />
      <PortionList 
        portions={portions} 
        selectedDrink={selectedDrink} 
        selectedPortions={selectedPortions} 
        handlePortionSelect={handlePortionSelect} 
        isPortionDisabled={isPortionDisabled} 
      />
      <Grid container justifyContent="center">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleServeClick} 
          disabled={Object.keys(selectedPortions).length === 0}
          className="large-button"
        >
          CONTINUAR
        </Button>
      </Grid>
      <TotalConsumption totalCost={calculateTotalCost()} />
    </Container>
  );
}

export default SelectionScreen;