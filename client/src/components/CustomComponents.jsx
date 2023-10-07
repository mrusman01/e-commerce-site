import React from "react";
import { TextField } from "@mui/material";

export const CutomTextField = ({
  id,
  label,
  name,
  autoComplete,
  value,
  onChange,
  type,
}) => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={name}
      autoComplete={autoComplete}
      autoFocus
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};
