import { Container, Grid } from "@mui/material";

import CreateGroup from "./CreateGroup";
import GroupChat from "./GroupChat";

const Group = () => {
  return (
    <Container maxWidth="xl">
      <Grid container justifyContent={"space-between"}>
        <Grid
          item
          xs={12}
          md={2}
          sx={{ border: "2px solid #000", height: "90vh" }}
        >
          <CreateGroup />
        </Grid>
        <Grid item xs={12} md={9}>
          {/* <Outlet /> */}
          <GroupChat />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Group;
