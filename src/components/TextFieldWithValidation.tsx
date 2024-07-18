import React from 'react';
import { TextField } from '@mui/material';

type TextFieldWithValidationProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const TextFieldWithValidation: React.FC<TextFieldWithValidationProps> = ({
  label,
  name,
  value,
  onChange,
  onKeyPress,
  error,
  helperText,
  inputProps,
}) => {
  return (
    <TextField
      label={label}
      name={name}
      variant="outlined"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      fullWidth
      margin="normal"
      sx={{ width: "300px" }}
      error={!!error}
      helperText={helperText}
      inputProps={inputProps}
    />
  );
};

export default TextFieldWithValidation;