import { useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";

const MembersChat = () => {
  // const { autherId, userName } = useContext(AuthContext);
  const onwerId = localStorage.getItem("onwerId");
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async () => {
    const data = {
      text: newMessage,
      onwerId: onwerId,
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
  return (
    <div>
      <Grid
        container
        sx={{
          height: "77vh",
          border: "1px solid black",
          overflowY: "scroll",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          {[1, 2, 3, 4, 5].map((item, i) => (
            <Box key={i} sx={{ my: 1 }}>
              <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                item.text
              </Typography>
              <Typography
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "#1976D2",
                  fontSize: "7px",
                }}
              >
                author
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>

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
      </Box>
    </div>
  );
};

export default MembersChat;
