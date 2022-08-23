import { createContext, useContext, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext(true);

export function useAuthContext() {
    return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
    const baseURL = "http://localhost:8080/users";
    const [auth, setAuth] = useState(false);

    const authNewUser = async(newUser) => {
        try {
          const res = await axios.post(`${baseURL}/signup`, newUser);
          if (res.data) {
          setAuth(true);
          }
        } catch (err) {
          console.log(err);
        }
      };

    const authLogin = async(logAttempt) => {
      try {
        const res = await axios.post(`${baseURL}/login`, logAttempt);
        if (res.data) {
          setAuth(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    
    return <AuthContext.Provider value={{ auth, setAuth, authNewUser, authLogin }}>{children}</AuthContext.Provider>
}