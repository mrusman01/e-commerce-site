import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Signup from "./components/Signup";
import Login from "./components/Login";
import VerifyUser from "./pages/VerifyUser";
import ProtectRouter from "./components/ProtectRouter";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import AddToCart from "./pages/AddToCart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account-verify" element={<VerifyUser />} />
        <Route path="/" element={<ProtectRouter />}>
          <Route path=" " element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-products" element={<AddProduct />} />
          <Route path="/cart-products" element={<AddToCart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
