import SignupForm from "../components/SignupForm"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react";

const editAttempt = (num) => {
  switch (num) {
    case 1:
      toast.success("Profile updated!", {
        autoClose: 5000,
      });
      window.location.reload();
      break;
    case 2:
      toast.error("Sorry, email address is already taken", {
        autoClose: 7000,
      });
      break;
  }
};



function MyProfile() {
  console.log("component renders");

useEffect(() => {
  console.log("component renders with useEffect")
}, [])

  return (
    <div className="d-flex flex-column justify-content-between">
      <h1 className="mt-3 mb-5">Profile Settings</h1>
      <SignupForm
        editAttempt={editAttempt}
        className="d-flex justify-content-evenly"
      />
      <ToastContainer />
    </div>
  );
}

export default MyProfile;
