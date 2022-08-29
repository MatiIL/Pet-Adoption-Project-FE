import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';


export const AuthContext = createContext(true);

export function useAuthContext() {
    return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
    const usersRoute = "http://localhost:8080/users";
    const [auth, setAuth] = useState(false);
    const [loggedUser, setLoggedUser] = useState({});
    const [cookieToken, setCookieToken] = useState();

    const authNewUser = async(newUser) => {
        try {
          const res = await axios.post(`${usersRoute}/signup`, newUser);
          if (res.data) {
          setAuth(true);
          }
        } catch (err) {
          console.log(err);
        }
      };

    const authLogin = async(logAttempt) => {
      try {
        const res = await axios.post(`${usersRoute}/login`, logAttempt, {withCredentials: true  });
        if (res.data) {
          setLoggedUser(res.data.user);
          setAuth(true);
        }
      } catch (err) {
        console.log(err);
      }
    }

    const logout = async() => {
      try {
      const res = await axios.get(`${usersRoute}/logout`, {withCredentials: true});
      if (res.data) setAuth(false);
    } catch (err) {
      console.log(err);
    }
  }

    return <AuthContext.Provider value={{ auth, setAuth, authNewUser, authLogin, loggedUser, logout }}>{children}</AuthContext.Provider>
}