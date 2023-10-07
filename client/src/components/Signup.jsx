import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CutomTextField } from "./CustomComponents";
// import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const defaultTheme = createTheme();

const SignUp = () => {
  // const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [avatars, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("number", number);
    formData.append("avatar", avatars);

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.message);
      setResponseMessage(response.data.message);
      setOpen(true);

      setName("");
      setEmail("");
      setPassword("");
      setNumber("");
      setAvatar(null);
    } catch (error) {
      setError(error);
      setResponseMessage(error.response?.data?.message || "An error occurred.");
      setOpen(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <CutomTextField
              id={"username"}
              label={"UserName"}
              name={"username"}
              autoComplete={"username"}
              onChange={(e) => setName(e.target.value)}
            />
            <CutomTextField
              id={"email"}
              label={"Email Address"}
              name={"email"}
              autoComplete={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CutomTextField
              name={"password"}
              label={"Password"}
              type={"password"}
              id={"password"}
              autoComplete={"current-password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CutomTextField
              name={"Phone"}
              label={"Phone"}
              type={"number"}
              id={"phone"}
              autoComplete={"current-number"}
              onChange={(e) => setNumber(e.target.value)}
            />

            <CutomTextField
              name={"avatar"}
              label=""
              type={"file"}
              id={"avatar"}
              autoComplete={"current-file"}
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {/* <NavLink to="/login">{"If you have an account? Login"}</NavLink> */}
              </Grid>
            </Grid>
          </Box>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handleClose}
          >
            {error ? (
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "auto" }}
              >
                {error.message}
              </Alert>
            ) : (
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "auto" }}
              >
                {responseMessage}
              </Alert>
            )}
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
