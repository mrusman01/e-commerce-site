import { useContext, useEffect, useState } from "react";
import axios from "axios";

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
import { Alert, Snackbar } from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../services/authProvider";
import { CutomTextField } from "./CustomComponents";

const defaultTheme = createTheme();

const Login = () => {
  const { setRole, setAutherId, setUserName } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  // console.log(isChecked, "----");

  const navigate = useNavigate();

  useEffect(() => {
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedPassword) {
      // console.log(isChecked, "--password--");
      setPassword(savedPassword);
      setIsChecked(true);
    }
  }, []);

  const handleRememberPassword = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        formData
      );
      // console.log(response, "-----");
      const { _id, name } = response.data.user;
      setUserName(name);
      setAutherId(_id);
      localStorage.setItem("onwerName", name);
      localStorage.setItem("onwer", _id);
      const getRole = response.data?.user?.roles;
      localStorage.setItem("roles", getRole);
      setRole(getRole);
      const token = response.data.token;
      localStorage.setItem("token", token);
      if (isChecked) {
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedPassword");
      }
      navigate("/");
      setResponseMessage(response.data.message);

      setOpen(true);
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={isChecked}
                  onClick={handleRememberPassword}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to="/register">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
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
              {responseMessage}
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
      </Container>
    </ThemeProvider>
  );
};

export default Login;
