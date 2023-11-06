import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

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

export const StyledDialog = ({ open, setOpen, addMember, click }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogContent>
        <DialogTitle>Add member</DialogTitle>

        <CutomTextField
          label="Email"
          onChange={(e) => addMember(e.target.value)}
        />
        <DialogActions>
          <Button onClick={click}>Add User</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
