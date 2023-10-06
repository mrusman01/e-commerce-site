import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const SidebarChat = () => {
  const [userName, setUserName] = useState([]);
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/all-user", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      let { user } = response.data;
      setUserName(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box>
      {userName.map((item) => (
        <Link key={item._id} to={`/chat-app/${item._id}`}>
          <Button variant="contained" sx={{ width: "100%", mt: 2, p: 2 }}>
            {item.name}
          </Button>
        </Link>
      ))}
    </Box>
  );
};

export default SidebarChat;
