import { createContext, useContext, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext(true);

export function useAuthContext() {
    return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
    const usersRoute = "http://localhost:8080/users";
    // const [auth, setAuth] = useState(false);
    const [loggedUser, setLoggedUser] = useState({});
    const [userId, setUserId] = useState(null);
    const [auth, setAuth] = useState(false);

    const authNewUser = async (newUser) => {
        try {
          const res = await axios.post(`${usersRoute}/signup`, newUser);
          if (res.data) {
          
          }
        } catch (err) {
          console.log(err);
        }
      };

    const loginUser = async (logAttempt) => {
      try {
        const res = await axios.post(`${usersRoute}/login`, logAttempt, { withCredentials: true  });
        if (res.data) {
          // setUserId(res.data.user.userId)
          setLoggedUser(res.data.user);
          setAuth(true);
        }
      } catch (err) {
        console.log(err);
      }
    }

    // const currentUserAuth = async (userId) => {
    //   try {
    //     const res = await axios.get(`${usersRoute}/${userId}`, { withCredentials: true });
    //     if (res.data) {
    //       setLoggedUser(res.data.user);
    //       setAuth(true);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }


    const logout = async () => {
      try {
      const res = await axios.get(`${usersRoute}/logout`, { withCredentials: true });
      if (res.data) setLoggedUser({});
    } catch (err) {
      console.log(err);
    }
  }

    return <AuthContext.Provider value={{ authNewUser, loginUser, loggedUser, logout, userId, auth, setAuth }}>{children}</AuthContext.Provider>
}