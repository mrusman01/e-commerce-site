import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const authToken = localStorage.getItem("token");

  useEffect(() => {
    if (!authToken) {
      localStorage.clear();
      // navigate("/login");
    }
  });

  const contextValue = {
    user,
    setUser,
    authToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
