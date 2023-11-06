import { useEffect, useState } from "react";
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
import {
  CutomTextField,
  StyledDialog,
} from "../../components/CustomComponents";
import { Link } from "react-router-dom";

const CreateGroupSideBar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [groupName, setGroupName] = useState("");
  const [getGroups, setGetGroups] = useState([]);
  const onwerId = localStorage.getItem("onwerId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      user,
      groupName,
    };
    const data = { memberEmail: formData, onwerId: onwerId };
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

      console.log(response, "----- create group ----------------");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllGroups = async () => {
    try {
      const response = await axios.get("http://localhost:4000/allGroups", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      // console.log(response);
      const { allGroups } = response.data;
      setGetGroups(allGroups);
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
  useEffect(() => {
    getAllGroups();
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        sx={{ mt: 3, width: "100%" }}
        onClick={handleClickOpen}
      >
        create Group
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogContent>
          <DialogTitle>Add user?</DialogTitle>

          <CutomTextField
            label="Email"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <CutomTextField
            label="name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <DialogActions>
            <Button onClick={handleSubmit}>Add User</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Typography variant="h6" textAlign="center">
        All Groups
      </Typography>

      <Box>
        {getGroups.map((item, i) => {
          // console.log(item._id);
          return (
            <Box key={i} sx={{ my: 1 }}>
              <Link to={`/showUser-groups/${item._id}`}>
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: "bold",
                    color: "#1F1F1F",
                    width: "100%",
                    my: 1,
                  }}
                >
                  {item.groupName}
                </Button>
              </Link>
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export default CreateGroupSideBar;
