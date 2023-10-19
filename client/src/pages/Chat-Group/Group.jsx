import { Container, Grid } from "@mui/material";

import GroupChat from "./GroupChat";

const Group = () => {
  return (
    <Container maxWidth="xl">
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={12}>
          {/* <Outlet /> */}
          <GroupChat />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Group;
