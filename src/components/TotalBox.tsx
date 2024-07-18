import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

type TotalBoxProps = {
  totalCost: number;
};

const TotalBox: React.FC<TotalBoxProps> = ({ totalCost }) => {
  return (
    <Box mt={2} component={Paper} p={2} textAlign="center">
      <Typography variant="h6">Total:</Typography>
      <Typography variant="h4" color="primary">
        ${totalCost.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default TotalBox;