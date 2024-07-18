import React from 'react';
import { Button } from '@mui/material';
import '../styles/styles.css';

const EnterButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      className="enter-button"
    >
      Ingresar
    </Button>
  );
};

export default EnterButton;