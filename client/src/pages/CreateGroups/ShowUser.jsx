import { useEffect, useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { useParams } from "react-router-dom";
import axios from "axios";
import { StyledDialog } from "../../components/CustomComponents";

const ShowUser = () => {
  const { id } = useParams();
  const [allMembers, setAllMembers] = useState([]);
  const [membersChat, setMembersChat] = useState([]);
  const [openTo, setOpenTo] = useState(false);
  const [addMember, setAddMember] = useState("");

  const onwerId = localStorage.getItem("onwerId");
  const name = localStorage.getItem("name");
  const [newMessage, setNewMessage] = useState("");
  const [memberMsg, setMemberMsg] = useState([]);

  const sendMessage = async () => {
    console.log(onwerId);
    const data = {
      text: newMessage,
      onwerId: onwerId,
      name: name,
      _id: id,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/sendMessageInGroup",
        data,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response, "-----response------");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAllMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/allGroupMembers/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      const { messages } = response.data;
      setAllMembers(...messages);
    } catch (error) {
      console.log(error);
    }
  };

  const getMsg = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/getMemberMessages/${id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(response, "message");
      const { messages } = response.data;
      setMembersChat(...messages);
    } catch (error) {
      console.log(error);
    }
  };

  const addMemberGroupsRequest = async () => {
    const data = { memberEmail: addMember, onwerId: onwerId, _id: id };
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

  const handleClose = () => {
    setOpenTo(false);
  };

  useEffect(() => {
    handleAllMembers();
    getMsg();
  }, []);

  return (
    <div>
      <Grid
        container
        sx={{
          height: "91vh",
          overflowY: "scroll",
          p: 2,
        }}
      >
        <Grid item xs={3} sx={{ border: "2px solid red" }}>
          <Button
            onClick={() => setOpenTo(true)}
            variant="outlined"
            sx={{ my: 2 }}
          >
            add Members
          </Button>
          <StyledDialog
            open={openTo}
            setOpen={setOpenTo}
            addMember={setAddMember}
            click={addMemberGroupsRequest}
          />
          <Box>
            {allMembers.map((item, i) => {
              return (
                <Box key={i} sx={{ my: 1 }}>
                  <Typography variant="h5">{item.name}</Typography>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={8}>
          {membersChat.map((item, i) => {
            return (
              <Box key={i} sx={{ my: 1 }}>
                <Typography>{item.text}</Typography>
              </Box>
            );
          })}

          <Box mt={2} display={"flex"} alignItems="center" gap={1}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="message"
              label="Enter something"
              name="message"
              autoFocus
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <Button
              variant="contained"
              onClick={sendMessage}
              sx={{ height: "53px", mt: "4px" }}
            >
              Send
            </Button>
            {/* <Button onClick={handleGetMsg}>get msg</Button> */}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShowUser;
