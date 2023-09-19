import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SecurityIcon from "@mui/icons-material/Security";
import axios from "axios";
// import { Link, NavLink, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const defaultTheme = createTheme();

const VerifyUser = () => {
  //   const navigate = useNavigate();
  const [code, setCode] = useState("");
  const handleSubmit = async () => {
    console.log(code);
    try {
      await axios
        .post("http://localhost:4000/account-verify", {
          authCode: code,
        })
        .then((response) => {
          // console.log(response);
          console.log(response.data?.message);
          //   navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <SecurityIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verification
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="varificationCode"
              label="Varification Code"
              name="varificationCode"
              autoComplete="varificationCode"
              autoFocus
              onChange={(e) => setCode(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Verify
            </Button>
          </Box>
          <Grid container justifyContent={"center"}>
            <Grid item>
              {/* <NavLink to="/create_acc">
                <Link href="#" variant="body2">
                  {"Resend Again "}
                </Link>
              </NavLink> */}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default VerifyUser;
