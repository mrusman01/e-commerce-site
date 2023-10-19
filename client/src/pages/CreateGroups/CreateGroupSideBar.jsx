import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { CutomTextField } from "../../components/CustomComponents";

const CreateGroupSideBar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [addMember, setAddMember] = useState("");
  const onwerId = localStorage.getItem("onwerId");

  const handleSubmit = async () => {
    const data = { memberEmail: user, onwerId: onwerId };
    try {
      const response = await axios.post(
        "http://localhost:4000/createMemberGroups",
        data,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log(response, "-----");
    } catch (error) {
      console.log(error);
    }
  };

  const addMemberGroupsRequest = async () => {
    const data = { memberEmail: addMember, onwerId: onwerId };
    try {
      const response = await axios.post(
        "http://localhost:4000/addMemberGroup",
        data,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response, "add Memberin  Groups");
    } catch (error) {
      console.log(error);
    }
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
        create Group
      </Button>

      <CutomTextField
        label="Email"
        onChange={(e) => setAddMember(e.target.value)}
      />

      <Button onClick={addMemberGroupsRequest}>Add Member</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogContent>
          <DialogTitle>Add User</DialogTitle>

          <CutomTextField
            label="Email"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <DialogActions>
            <Button onClick={handleSubmit}>Add User</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Box>
        {memberList.map((item, i) => {
          console.log(item);
          return (
            <Box key={i} sx={{ my: 1 }}>
              <Typography sx={{ fontWeight: "bold", color: "#1F1F1F" }}>
                {item.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default CreateGroupSideBar;
