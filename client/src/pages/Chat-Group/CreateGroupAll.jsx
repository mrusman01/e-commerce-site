import { CutomTextField } from "../../components/CustomComponents";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const CreateGroup = () => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState("");

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:4000/adduser", user, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    console.log(response, "-----");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add user
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogContent>
          <DialogTitle>Add User</DialogTitle>
          <DialogContentText id="alert-dialog-description">
            <CutomTextField
              label="Email"
              onChange={(e) => setUser(e.target.value)}
            />
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleSubmit}>Add User</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateGroup;
