import { Container, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

import SidebarChat from "./SidebarChat";
import Conservation from "./Conservation";

const Chat = () => {
  return (
    <Container maxWidth="xl">
      <Grid container justifyContent={"space-between"}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{ border: "2px solid #000", height: "100vh" }}
        >
          <SidebarChat />
        </Grid>
        <Grid item xs={12} md={8}>
          <Outlet />
          {/* <Conservation /> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
