import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

function HomePage() {
  const { isAdmin, token, loggedUser } = useAuthContext();
  const userName = loggedUser.firstName;
  const [welcomeMsg, setWelcomeMsg] = useState("");

  const presentWelcome = () => {
    if (!token && !isAdmin) {
      const defaultMessage =
        "Welcome to the Pet Adoption Center, where you can search for your next four-legged friend to adopt! Not looking to adopt currently? you can also foster a pet for a limited time.";
      setWelcomeMsg(defaultMessage);
    } else {
      if (token) {
        const welcomeUser =
          "Good to see you back! have a look at your saved pets list and see if any of them has become available for adoption or fostering since your last visit here.";
        setWelcomeMsg(welcomeUser);
      }
      if (isAdmin) {
        const welcomeAdmin =
          "Check your administrative functionalities on the dropdown menu at the top left corner of the navigation bar. You can add a new pet to the app's database, edit existing pets details, and browse through the users in order to easily retrieve their contact information and see which pets they currently own.";
        setWelcomeMsg(welcomeAdmin);
      }
    }
  };

  useEffect(() => {
    presentWelcome();
  }, [token, isAdmin]);

  return (
    <div className="wrapper d-flex flex-column justify-content-around">
      <div className="mt-4">
        <h1>{token ? `Welcome ${userName}!` : "Welcome To The Site!"}</h1>
      </div>
      <div className="mt-3 w-50 text-center align-self-center">
        {welcomeMsg}
      </div>
    </div>
  );
}

export default HomePage;
