import { useEffect, useState } from "react";
import axios from "axios";
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
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Snackbar,
} from "@mui/material";
import { addCart } from "../services/productSlice";
import { useDispatch } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:5173/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Products = () => {
  const [category, setCategory] = useState("item");
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  // const [error, setError] = useState(null);
  const [pages, setPages] = useState(1);
  const [totalProduct, setTotalProduct] = useState(1);

  const productsPerPage = 5;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/all-products/${category}/${pages}/${productsPerPage}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setTotalProduct(response.data.totalProducts);
      setData(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [category, pages]);

  const deleteItem = async (item) => {
    const id = item._id;
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:4000/del-products/${id}`
      );

      setResponseMessage(response.data.message);
      setOpen(true);
      fetchData();
    } catch (error) {
      console.log(error);
      setError(error);
      setResponseMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const addCartProduct = (item) => {
    dispatch(addCart(item));
    setResponseMessage("Product add in cart");
    setOpen(true);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleChangePage = (event, value) => {
    setPages(value);
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
              Market Products
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
              <Box sx={{ minWidth: 220 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="category"
                    onChange={handleChange}
                  >
                    <MenuItem value={"item"}>All</MenuItem>
                    <MenuItem value={"phone"}>Phone</MenuItem>
                    <MenuItem value={"food"}>food</MenuItem>
                    <MenuItem value={"clothes"}>Clothes</MenuItem>
                  </Select>
                </FormControl>
              </Box>
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
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Typography>categories: {item.categories}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        onClick={() => addCartProduct(item)}
                      >
                        Add to cart
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => deleteItem(item)}
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
        <Box display={"flex"} justifyContent={"center"}>
          <Pagination
            count={Math.ceil(totalProduct / productsPerPage)}
            page={pages}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
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

export default Products;
