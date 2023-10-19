import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { AuthContext } from "../../services/authProvider";

const GroupChat = () => {
  const { autherId, userName } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const [list, setList] = useState([]);
  const ref = useRef(null);

  const handleSendMessage = async () => {
    const data = { text: newMessage, auther: autherId, autherName: userName };

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
      `http://localhost:4000/getMessages-chat/${autherId}`,
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
    refetchInterval: 2000,
  });

  useEffect(() => {
    setList(data?.data?.userMessage);
  }, [data]);

  useEffect(() => {
    if (list.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [list.length]);

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
        <Grid item xs={12} ref={ref}>
          {list.map((item, i) => (
            <Box key={i} sx={{ my: 1 }}>
              {item.auther === autherId ? (
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
          value={newMessage}
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
