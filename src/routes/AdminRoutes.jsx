import React from "react"
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

const AdminRoutes = ({ children }) => {
  const auth = useAuthContext();
  return auth.isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoutes;