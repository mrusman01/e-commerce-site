import { Typography, Container, Paper } from "@mui/material";

const Home = () => {
  return (
    <div>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 6, mt: 10 }}>
          <Typography variant="h4">Welcome to Your Website</Typography>
          <Typography variant="body1">
            This is your homepage content. You can customize it with your own
            text, images, and components.
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;
