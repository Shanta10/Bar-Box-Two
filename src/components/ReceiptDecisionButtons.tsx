import React from 'react';
import { Button, Box } from '@mui/material';

type ReceiptDecisionButtonsProps = {
  handleReceiptDecision: (receiptBoolean: boolean) => void;
};

const ReceiptDecisionButtons: React.FC<ReceiptDecisionButtonsProps> = ({ handleReceiptDecision }) => {
  return (
    <Box mt={3} display="flex" flexDirection="column" alignItems="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleReceiptDecision(true)}
        sx={{ mb: 2, width: '200px', height: '50px', fontSize: '18px' }}
      >
        Sí
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleReceiptDecision(false)}
        sx={{ width: '200px', height: '50px', fontSize: '18px' }}
      >
        No
      </Button>
    </Box>
  );
};

export default ReceiptDecisionButtons;