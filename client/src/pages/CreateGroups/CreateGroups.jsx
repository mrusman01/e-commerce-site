import { Grid } from "@mui/material";
import CreateGroupSideBar from "./CreateGroupSideBar";
import MembersChat from "./MembersChat";
const CreateGroups = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3}>
          <CreateGroupSideBar />
        </Grid>
        <Grid item xs={12} md={9}>
          <MembersChat />
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateGroups;
