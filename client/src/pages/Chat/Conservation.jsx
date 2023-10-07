import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { AuthContext } from "../../services/authProvider";

const Conservation = () => {
  const { autherId } = useContext(AuthContext);
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [messageList2, setMessageList2] = useState([]);

  const handleSendMessage = async () => {
    const data = { text: newMessage, anotherUser: id, auther: autherId };
    try {
      const response = await axios.post(
        "http://localhost:4000/chat-application",
        data,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/chat-application/getMessages/${id}/${autherId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data, "=========");
      const { userMessages, userMessagesAnother } = response.data;
      // console.log(userMessagesAnother, "======+++");
      // console.log(userMessages, "111");
      setMessageList(userMessages);
      setMessageList2(userMessagesAnother);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMessages();
  }, [newMessage]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6}>
          ------------ another user---------
          {messageList2.map((item, i) => (
            <div key={i}>
              <Typography>{item.text}</Typography>
            </div>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          me
          {messageList.map((item, i) => (
            <div key={i}>
              <Typography>{item.text}</Typography>
            </div>
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
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
        <br />
        {/* <Button variant="contained" onClick={getMessages}>
          get message
        </Button> */}
      </Box>
    </div>
  );
};

export default Conservation;
