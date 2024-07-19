import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import '../styles/styles.css';

interface TotalConsumptionProps {
  totalCost: number;
}

const TotalConsumption: React.FC<TotalConsumptionProps> = ({ totalCost }) => {
  return (
    <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
      <Box border={1} borderColor="grey.400" borderRadius={5} p={2}>
        <Typography variant="h6">
          Consumo Total: ${totalCost.toFixed(2)}
        </Typography>
      </Box>
    </Grid>
  );
};

export default TotalConsumption;
