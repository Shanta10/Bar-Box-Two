import React from 'react';
import { Button } from '@mui/material';
import '../styles/styles.css';

interface EnterButtonProps {
  onClick: () => void;
}

const EnterButton: React.FC<EnterButtonProps> = ({ onClick }) => {
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
