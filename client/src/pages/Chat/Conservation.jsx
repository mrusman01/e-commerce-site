import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Box, Button, Paper, TextField } from "@mui/material";

const Conservation = () => {
  const { id } = useParams();

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    const data = { text: newMessage, userId: id };
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
        `http://localhost:4000/chat-application/getMessages/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data, "=========");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div>
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
      </Box>
    </div>
  );
};

export default Conservation;
