import React from 'react';
import { TextField, Box } from '@mui/material';

type CedulaInputProps = {
  cardId: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CedulaInput: React.FC<CedulaInputProps> = ({ cardId, handleChange }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <TextField
        label="Número de cédula"
        variant="outlined"
        value={cardId}
        onChange={handleChange}
        fullWidth
        margin="normal"
        inputProps={{ maxLength: 10 }}
        sx={{ width: "300px" }}
      />
    </Box>
  );
};

export default CedulaInput;