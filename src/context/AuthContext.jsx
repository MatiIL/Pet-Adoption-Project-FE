import { createContext, useContext, useEffect, useState } from "react"
import instance from "./AxiosContext"

export const AuthContext = createContext(true);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
  const usersRoute = "http://localhost:8080/users";
  const [registeredUser, setRegisteredUser] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [passesNoMatch, setPassesNoMatch] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [savedPets, setSavedPets] = useState([]);
  const [ownedPets, setOwnedPets] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({});
  const [token, setToken] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [didUserUpdate, setDidUserUpdate] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [isTakenMessage, setIsTakenMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fullUserInfo, setFullUserInfo] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  const authNewUser = async (newUser) => {
    try {
      setShowSpinner(true);
      const res = await instance.post(`${usersRoute}/signup`, newUser);
      if (res.data) {
        setShowSpinner(false);
        setRegisteredUser(true);
      }
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
      const errMsg = err.response.data;
      setSignupError(errMsg);
      if (errMsg.includes("Passwords")) setPassesNoMatch(true);
    }
  };

  const loginUser = async (logAttempt) => {
    try {
      setShowSpinner(true);
      const res = await instance.post(`${usersRoute}/login`, logAttempt);
      if (res.data) {
        setShowSpinner(false);
        const userObj = res.data.user._doc;
        setLoggedUser(userObj);
        setToken(true);
        if (res.data.user._doc.isAdmin) {
          setIsAdmin(true);
        }
      }
    } catch (err) {
      setShowSpinner(false);
      const errMsg = err.response.data;
      setLoginError(errMsg);
      if (errMsg.includes("Password")) {
        setWrongPass(true);
      } else setShowTooltip(true);
      console.log(err);
    }
  };

  async function currentUserAuth() {
    try {
      const res = await instance.get("http://localhost:8080/users/");
      if (res.data) {
        setLoggedUser(res.data);
        setToken(true);
        setSavedPets(loggedUser.savedPets);
        setOwnedPets(loggedUser.ownedPets);
        if (res.data.isAdmin) {
          setIsAdmin(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (loggedUser) {
    currentUserAuth();
    }
  }, [loggedUser]);

  const logout = async () => {
    try {
      setShowSpinner(true);
      const res = await instance.get(`${usersRoute}/logout`);
      if (res.data) setLoggedUser({});
      setShowSpinner(false);
      setToken(false);
      if (isAdmin) setIsAdmin(false);
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  const updateUserDetails = async (newDetails) => {
    try {
      setShowSpinner(true);
      const res = await instance.put(`${usersRoute}/:userId`, newDetails);
      if (res.data) {
        setShowSpinner(false);
        switch (typeof res.data) {
          case "object":
            setUpdatedUser(res.data);
            setDidUserUpdate(true);
            break;
          case "string":
            setEmailTaken(true);
            setIsTakenMessage(res.data);
            break;
        }
      }
    } catch (err) {
      setShowSpinner(false);
      const errMsg = err.response.data
      setSignupError(errMsg);
      if (errMsg.includes("Passwords")) setPassesNoMatch(true);
    }
  };

  const getAllUsers = async () => {
    try {
      setShowSpinner(true);
      const res = await instance.get(`${usersRoute}/all-users`);
      if (res.data) {
        setShowSpinner(false);
        setAllUsers(res.data);
      }
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  const getUserInfo = async (userId) => {
    try {
      setShowSpinner(true);
      const res = await instance.get(`${usersRoute}/${userId}/full`);
      if (res.data) {
        setShowSpinner(false);
        setFullUserInfo(res.data);
      }
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authNewUser,
        registeredUser,
        signupError,
        passesNoMatch,
        setPassesNoMatch,
        loginUser,
        loggedUser,
        setLoggedUser,
        savedPets,
        setSavedPets,
        ownedPets,
        setOwnedPets,
        loginError,
        wrongPass,
        setWrongPass,
        showTooltip,
        setShowTooltip,
        logout,
        token,
        setToken,
        didUserUpdate,
        updateUserDetails,
        updatedUser,
        emailTaken,
        isTakenMessage,
        getAllUsers,
        allUsers,
        getUserInfo,
        fullUserInfo,
        isAdmin,
        setIsAdmin,
        showSpinner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
