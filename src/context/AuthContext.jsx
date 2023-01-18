import { createContext, useContext, useEffect, useState } from "react";
import instance from "./AxiosContext";

export const AuthContext = createContext(true);

export const useAuthContext = () => {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
    const usersRoute = "http://localhost:8080/users";
    const [registeredUser, setRegisteredUser] = useState(false);
    const [loggedUser, setLoggedUser] = useState({});
    const [token, setToken] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);
    const [isTakenMessage, setIsTakenMessage] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); 
    const [fullUserInfo, setFullUserInfo] = useState([]);

    const authNewUser = async (newUser) => {
        try {
          const res = await instance.post(`${usersRoute}/signup`, newUser);
          if (res.data) {
            setRegisteredUser(true);
          }
        } catch (err) {
          console.log(err);
        }
      };

    const loginUser = async (logAttempt) => {
      try {
        const res = await instance.post(`${usersRoute}/login`, logAttempt);
        if (res.data) {
          const userObj = res.data.user;
          setLoggedUser(userObj);
          setToken(true);
          if (res.data.user.isAdmin) {
            setIsAdmin(true);
          }
          }
      } catch (err) {
        console.log(err);
      }
    }

    async function currentUserAuth() {
      try {
        const res = await instance.get('http://localhost:8080/users/');
        if (res.data) {
          
            setLoggedUser(res.data);
            setToken(true);
            if (res.data.isAdmin) {
              setIsAdmin(true);
            }
          }
      } catch (err) {
        console.log(err);
      }
    }

    useEffect(() => {
      currentUserAuth();
    }, []);

    const logout = async () => {
      try {
      const res = await instance.get(`${usersRoute}/logout`);
      if (res.data) setLoggedUser({});
      setToken(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const updateUserDetails = async (newDetails) => {
    try {
      const res = await instance.put(`${usersRoute}/:userId`, newDetails);
      if (res.data) {
        switch(typeof(res.data)) {
          case "object":
            setLoggedUser(res.data)
            setUpdatedUser(true);
          case "string":
            setEmailTaken(true);
            setIsTakenMessage(res.data);
        }
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

   const getAllUsers = async () => {
    try {
      const res = await instance.get(`${usersRoute}/all-users`);
      if (res.data) setAllUsers(res.data);
    } catch (err) {
      console.log(err);
    }
   }

   const getUserInfo = async (userId) => {
    try {
      const res = await instance.get(`${usersRoute}/${userId}/full`);
      if (res.data) {
        setFullUserInfo(res.data);
      }
    } catch (err) {
      console.log(err);
    }
   }

  
    return <AuthContext.Provider value={{ authNewUser, registeredUser, loginUser, loggedUser, setLoggedUser, logout, token, setToken, updateUserDetails, updatedUser, emailTaken, isTakenMessage, getAllUsers, allUsers, getUserInfo, fullUserInfo, isAdmin, setIsAdmin }}>{children}</AuthContext.Provider>
}