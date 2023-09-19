import { useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [rating, setRating] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("rating", rating);
    formData.append("avatar", avatar);
    formData.append("quantity", quantity);
    formData.append("categories", categories);

    try {
      const response = await axios.post(
        "http://localhost:4000/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data);
      setResponseMessage(response.data.message);
      setOpen(true);
    } catch (error) {
      console.error(error);
      setError(error);
      setResponseMessage(error.response?.data?.message || "An error occurred.");
    }
    setTitle("");
    setDescription("");
    setPrice("");
    setRating("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Box p={2}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add Products
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="quantity"
                label="Quantity"
                name="quantity"
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="categories"
                label="Categories"
                name="categories"
                onChange={(e) => setCategories(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="avatar"
                label="Image"
                name="avatar"
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="rating"
                label="Rating"
                name="rating"
                onChange={(e) => setRating(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
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
        </Container>
      </Box>
    </div>
  );
};

export default AddProduct;
