import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { AuthContext } from "../../services/authProvider";
import { useQuery } from "@tanstack/react-query";

const GroupChat = () => {
  const { autherId, userName } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const [list, setList] = useState([]);
  const onwerName = localStorage.getItem("onwerName");
  const onwer = localStorage.getItem("onwer");

  const handleSendMessage = async () => {
    const data = { text: newMessage, auther: onwer, autherName: onwerName };

    try {
      const response = await axios.post(
        "http://localhost:4000/group-chat",
        data,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response, "send message");
    } catch (error) {
      console.log(error);
    }
    setNewMessage("");
  };

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4000/getMessages-chat/${onwer}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response;
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["getMessages-chat"],
    queryFn: fetchData,
    staleTime: 1000,
    refetchInterval: 3000,
  });

  useEffect(() => {
    setList(data.data.userMessage);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

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
          {list.map((item, i) => (
            <Box key={i} sx={{ my: 1 }}>
              {item.auther === onwer ? (
                <Typography
                  sx={{
                    textAlign: "right",
                    fontWeight: "bold",
                    color: "#1976D2",
                  }}
                >
                  {item.text}
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
                  </Typography>
                </>
              )}
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
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{ height: "53px", mt: "4px" }}
        >
          Send
        </Button>
      </Box>
    </div>
  );
};

export default GroupChat;
