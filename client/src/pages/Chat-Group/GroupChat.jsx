import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { AuthContext } from "../../services/authProvider";

const GroupChat = () => {
  const { autherId } = useContext(AuthContext);
  console.log(autherId, "---------");
  const [newMessage, setNewMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [messageList2, setMessageList2] = useState([]);

  const handleSendMessage = async () => {
    const data = { text: newMessage, auther: autherId };
    const response = await axios.post(
      "http://localhost:4000/group-chat",
      data,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(response, "-----");
  };

  const getMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/getMessages-chat/${autherId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      console.log(response.data, "=========");
      const { userMessages, otherUsersMsg } = response.data;
      console.log(otherUsersMsg, "======+++");
      console.log(userMessages, "111");
      setMessageList(userMessages);
      setMessageList2(otherUsersMsg);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  // }, [newMessage]);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6}>
          {messageList.map((item, i) => (
            <Box key={i} sx={{ my: "10px" }}>
              <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          {messageList2.map((item, i) => (
            <Box key={i} sx={{ my: "10px" }}>
              <Typography
                sx={{ textAlign: "end", color: "#1976D2", fontWeight: "bold" }}
              >
                {item.text}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>

      <Box mt={2}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="message"
          label="Enter something"
          name="message"
          autoFocus
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" onClick={handleSendMessage}>
            Send
          </Button>
          <Button variant="contained" onClick={getMessages}>
            get msg
          </Button>
        </Box>
        <br />
        {/* <Button variant="contained" onClick={getMessages}>
          get message
        </Button> */}
      </Box>
    </div>
  );
};

export default GroupChat;
