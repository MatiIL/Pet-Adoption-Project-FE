import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function PrivateRoute({ children }) {
  // const navigate = useNavigate();
  // const { loggedUser, currentUserAuth } = useAuthContext();

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     const user = await currentUserAuth(loggedUser);
  //     if (!user) navigate('/');
  //   }
  //   verifyUser();
  // }, []);

  return children;
}

export default PrivateRoute;