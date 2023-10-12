import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const authToken = localStorage.getItem("token");
  const getRole = localStorage.getItem("roles");
  const [role, setRole] = useState(getRole);
  const [autherId, setAutherId] = useState("");

  useEffect(() => {
    if (!authToken) {
      localStorage.removeItem("token");
    }
  });

  const contextValue = {
    authToken,
    setRole,
    role,
    setAutherId,
    autherId,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
