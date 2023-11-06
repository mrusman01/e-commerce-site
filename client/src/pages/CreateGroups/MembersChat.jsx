import { useEffect, useState } from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";

const MembersChat = () => {
  // const { autherId, userName } = useContext(AuthContext);
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

  const handleGetMsg = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/getUserMessages/${onwerId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response, "-----response------");
      const { messages } = response.data;

      setMemberMsg(...messages);
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
          {memberMsg.map((item, i) => {
            return (
              // <div key={i}>
              //   <Typography>{item.text}</Typography>
              //   <Typography>{item.memberId}</Typography>
              // </div>
              <Box key={i} sx={{ my: 1 }}>
                {item.memberId === onwerId ? (
                  <Typography
                    sx={{
                      textAlign: "right",
                      fontWeight: "bold",
                      color: "#1976D2",
                    }}
                  >
                    {item.text}
                    {/* {item.name} */}
                  </Typography>
                ) : (
                  <>
                    <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
                      {item.text}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        color: "#1976D2",
                        fontSize: "7px",
                      }}
                    >
                      {item.autherName}
                      {item.name}
                    </Typography>
                  </>
                )}
              </Box>
            );
          })}
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
        <Button onClick={handleGetMsg}>get msg</Button>
      </Box>
    </div>
  );
};

export default MembersChat;
