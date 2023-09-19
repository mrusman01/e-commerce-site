import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const Errors = () => {
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      {error ? (
        <Alert onClose={handleClose} severity="error" sx={{ width: "auto" }}>
          {responseMessage}
        </Alert>
      ) : (
        <Alert onClose={handleClose} severity="success" sx={{ width: "auto" }}>
          {responseMessage}
        </Alert>
      )}
    </Snackbar>
  );
};

export default Errors;
