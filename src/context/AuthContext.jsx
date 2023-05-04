import { createContext, useContext, useEffect, useState } from "react";
import instance from "./AxiosContext";

export const AuthContext = createContext(true);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
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
  const [savedPetsData, setSavedPetsData] = useState([]);
  const [ownedPetsData, setOwnedPetsData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  const authNewUser = async (newUser) => {
    try {
      setShowSpinner(true);
      const res = await instance.post(`users/signup`, newUser);
      if (res.data.ok) {
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

      const res = await instance.post(`/users/login`, logAttempt);
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
      console.log(err.response);
      setLoginError(errMsg);
      if (errMsg.includes("Password")) {
        setWrongPass(true);
      } else setShowTooltip(true);
      console.log(err);
    }
  };

  async function currentUserAuth() {
    try {
      const res = await instance.get(`/users/authentication`);
      if (res.data) {
        const { isAdmin, savedPets, ownedPets } = res.data;
        setLoggedUser(res.data);
        setToken(true);
        setIsAdmin(isAdmin);
        setSavedPets(savedPets);
        setOwnedPets(ownedPets);
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
      setShowSpinner(true);
      const res = await instance.get(`/users/logout`);
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
      const res = await instance.put(`/users/:userId`, newDetails);
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
      const errMsg = err.response.data;
      setSignupError(errMsg);
      if (errMsg.includes("Passwords")) setPassesNoMatch(true);
    }
  };

  const getAllSavedPets = async () => {
    const res = await instance.get("/users/saved-pets");
    let savedArray = [];
    for (let petId of res.data) {
      const pet = await instance.get(`/pets/pet/${petId}`);
      savedArray.push(pet.data);
    }
    setSavedPetsData(savedArray);
  };

  const getAllOwnedPets = async () => {
    const res = await instance.get("/users/owned-pets");
    let ownedArray = [];
    for (let petId of res.data) {
      const pet = await instance.get(`/pets/pet/${petId}`);
      ownedArray.push(pet.data);
    }
    setOwnedPetsData(ownedArray);
  };

  const getAllUsers = async () => {
    try {
      setShowSpinner(true);
      const res = await instance.get(`/users/all-users`);
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
      const res = await instance.get(`/users/${userId}/full`);
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
        currentUserAuth,
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
        getAllOwnedPets,
        ownedPetsData,
        getAllSavedPets,
        savedPetsData,
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
