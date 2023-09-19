import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext } from "react";
import { AuthContext } from "../services/authProvider";

export default function ProtectRouter() {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />;
    </div>
  );
}
