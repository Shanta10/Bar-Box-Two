import React from 'react';
import { Grid, TextField } from '@mui/material';

type CustomerInfoProps = {
  customerData: {
    cardId: string;
    names: string;
    email: string;
    cellphone: string;
  };
};

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customerData }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Cédula"
          name="cardId"
          variant="outlined"
          value={customerData.cardId}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Nombre"
          name="names"
          variant="outlined"
          value={customerData.names}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Correo"
          name="email"
          variant="outlined"
          value={customerData.email}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Celular"
          name="cellphone"
          variant="outlined"
          value={customerData.cellphone}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CustomerInfo;