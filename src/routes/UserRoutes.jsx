import React from "react"
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const UserRoutes = ({ children }) => {
  const auth = useAuthContext();
  return auth.token ? children : <Navigate to="/" />;
};

export default UserRoutes;