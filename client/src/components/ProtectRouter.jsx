import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext } from "react";
import { AuthContext } from "../services/authProvider";

export default function ProtectRouter() {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);

  if (!authToken) {
    return navigate("/login");
  }

  return (
    <div>
      <Navbar />
      <Outlet />;
    </div>
  );
}
