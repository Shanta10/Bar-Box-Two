import React from 'react';
import { Snackbar, Alert } from '@mui/material';

type ErrorSnackbarProps = {
  error: string | null;
  setError: (error: string | null) => void;
};

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ error, setError }) => {
  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={() => setError(null)}
    >
      <Alert
        onClose={() => setError(null)}
        severity="error"
        sx={{ width: "100%" }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;