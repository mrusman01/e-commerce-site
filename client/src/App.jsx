import { Navigate, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Signup from "./components/Signup";
import Login from "./components/Login";
// import VerifyUser from "./pages/VerifyUser";
import ProtectRouter from "./components/ProtectRouter";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import AddToCart from "./pages/AddToCart";
import UserProducts from "./pages/UserProducts";
import Payment from "./components/Payment";
import { useContext } from "react";
import { AuthContext } from "./services/authProvider";
import Chat from "./pages/Chat/Chat";
import Conservation from "./pages/Chat/Conservation";
import GroupChat from "./pages/Chat-Group/GroupChat";
import Group from "./pages/Chat-Group/Group";
import CreateGroups from "./pages/CreateGroups/CreateGroups";
// import MembersChat from "./pages/CreateGroups/MembersChat";
import ShowUser from "./pages/CreateGroups/ShowUser";

function App() {
  const { role } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/account-verify" element={<VerifyUser />} /> */}
      <Route path="/" element={<ProtectRouter />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/add-products" element={<AddProduct />} /> */}
        <Route
          path="/add-products"
          element={role === "admin" ? <AddProduct /> : <Navigate to="/" />}
        />
        <Route path="/cart-products" element={<AddToCart />} />
        <Route path="/user-products" element={<UserProducts />} />
        <Route path="/create-checkout-session" element={<Payment />} />
        <Route path="/chat-app" element={<Chat />}>
          <Route path="/chat-app/:id" element={<Conservation />} />
        </Route>
        {/* <Route path="/group" element={<Group />}>
          <Route path="/GroupChat" element={<GroupChat />} />
        </Route> */}
        <Route path="/group" element={<Group />} />
        <Route path="/GroupChat" element={<GroupChat />} />
        <Route path="/seprate-groups" element={<CreateGroups />} />
        <Route path="/showUser-groups/:id" element={<ShowUser />} />
      </Route>
    </Routes>
  );
}

export default App;
