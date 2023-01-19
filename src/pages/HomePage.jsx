import { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

function HomePage() {
  const { isAdmin, token, loggedUser } = useAuthContext();
  const userName = loggedUser.firstName;
  const [welcomeMsg, setWelcomeMsg] = useState("");

  const presentWelcome = () => {
    if (!token && !isAdmin) {
      const defaultMessage = (
        <div className="mt-3 fs-5">
          Welcome to the Pet Adoption Center, where you can search for your next
          four-legged friend to adopt! Not looking to adopt currently? you can
          also foster a pet for a limited time.
        </div>
      );
      setWelcomeMsg(defaultMessage);
    } else {
      if (token) {
        const welcomeUser = (
          <div className="mt-3 fs-5">
            Good to see you back! have a look at your saved pets list and see if
            any of them has become available for adoption or fostering since
            your last visit.
          </div>
        );
        setWelcomeMsg(welcomeUser);
      }
      if (isAdmin) {
        const welcomeAdmin = (
          <div className="mt-3 fs-5">
            Check your administrative functionalities on the dropdown menu at
            the top left corner of the navigation bar. You can add a new pet to
            the app's database, edit existing pets details, and browse through
            the users in order to easily retrieve their contact information and
            see which pets they currently own.
          </div>
        );
        setWelcomeMsg(welcomeAdmin);
      }
    }
  };

  useEffect(() => {
    presentWelcome();
  }, [token, isAdmin]);

  return (
    <div className="wrapper  ">
      <div className="mt-4 d-flex flex-column">
        <h1 className={token ? "w-75" : ""}>
          {token
            ? `Welcome ${userName}!`
            : "Welcome To The Pet Adoption Center!"}
        </h1>

        <div
          id="hmpg-txt"
          className="bg-light bg-opacity-75 align-self-center fs-5 pe-2 pb-2 ps-3 fw-bolder rounded"
        >
          {welcomeMsg}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
