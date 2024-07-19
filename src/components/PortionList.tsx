import React from 'react';
import { Box } from '@mui/material';
import '../styles/styles.css';

interface Portion {
  id: number;
  label: string;
  value: number;
}

interface PortionListProps {
  portions: Portion[];
  selectedDrink: number | null;
  selectedPortions: { [key: number]: number };
  handlePortionSelect: (id: number) => void;
  isPortionDisabled: (value: number) => boolean;
}

const PortionList: React.FC<PortionListProps> = ({
  portions,
  selectedDrink,
  selectedPortions,
  handlePortionSelect,
  isPortionDisabled
}) => {
  return (
    <div className="quantity-options">
      {portions.map((portion) => (
        <Box
          key={portion.id}
          className={`quantity-option ${selectedDrink !== null && selectedPortions[selectedDrink] === portion.id ? 'selected' : ''}`}
          onClick={() => handlePortionSelect(portion.id)}
          style={{ 
            opacity: isPortionDisabled(portion.value) ? 0.5 : 1, 
            pointerEvents: isPortionDisabled(portion.value) ? 'none' : 'auto' 
          }}
        >
          {portion.label}
        </Box>
      ))}
    </div>
  );
};

export default PortionList;
