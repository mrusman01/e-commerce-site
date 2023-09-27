import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { remove } from "../services/productSlice";
import { useEffect, useState } from "react";
import axios from "axios";

import { Alert, Snackbar } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:5173/">
        Add to cart items
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const AddToCart = () => {
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);

  const data = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  const deleteProduct = (item) => {
    dispatch(remove(item._id));
  };

  const handlePayment = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/create-checkout-session",
        item,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const { url, message } = response.data;
      window.open(url, "_blank");
      setResponseMessage(message);
    } catch (error) {
      console.error(error);
      setError(error);
      setResponseMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {}, [data]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Add to Cart
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 5 }} maxWidth="lg">
          <Grid container spacing={4}>
            {data.length > 0 ? (
              data.map((item, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      p: 1,
                      borderRadius: "5px",
                    }}
                    elevation={2}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                        borderRadius: "10px",
                      }}
                      image={`http://localhost:4000/uploads/${item.avatar}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                      </Typography>
                      <Typography>Price:{item.price}</Typography>
                      <Typography>Discription: {item.description}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        onClick={() => handlePayment(item)}
                      >
                        Buy
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => deleteProduct(item)}
                      >
                        DEl
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h2" textAlign="center">
                  No Items
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        {error ? (
          <Alert onClose={handleClose} severity="error" sx={{ width: "auto" }}>
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
    </ThemeProvider>
  );
};

export default AddToCart;
