import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function SignupForm(props) {
  const { handleSubmit, closeSignup } = props;
  const { authNewUser, registeredUser, token, loggedUser, updateUserDetails, updatedUser, emailTaken, isTakenMessage, fullUserInfo, isAdmin } = useAuthContext();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  const clickedUser = fullUserInfo[0];
  const clickedUserPets = fullUserInfo[1];

    useEffect(() => {
      if (token) {
        setEmail(loggedUser.email);
        setFirstName(loggedUser.firstName);
        setLastName(loggedUser.lastName);
        setPhone(loggedUser.phone);
        setBio((loggedUser.bio != null)? loggedUser.bio : "");
      }
    }, [token, loggedUser]);

  const signupUser = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: pass,
      repeatPassword: repeatPass,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    };
    try {
      authNewUser(newUser);
      if (registeredUser) {
        handleSubmit();
        closeSignup();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveUserDetails = (e) => {
    e.preventDefault();
    const newDetails = {
      email: email,
      password: pass,
      repeatPassword: repeatPass,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      bio: bio,
    };
    try {
      updateUserDetails(newDetails);
      if (updatedUser) {
        console.log(updatedUser) //replace with successful update toast
      }
      if (emailTaken) {
        console.log(isTakenMessage); //replace with error toast
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form className="d-flex justify-content-evenly">
      <div className="left-col d-flex flex-column">
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            value={isAdmin? clickedUser.email : email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@example.com"
            autoFocus
          />
        </Form.Group>
        {isAdmin? <div className="d-flex flex-column justify-content-evenly mt-2">
          <u>User Pets</u>
          {clickedUserPets.map((pet) => (
            <ul key={pet.petId} className="mt-2">
              <li className="d-flex justify-content-between">
              <div>Name: {pet.name}</div>
                <div>Pet ID: {pet.petId}</div>
              </li>
            </ul>
          )
          )}
        </div> : 
        
        (<div className="set-password"><Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicPasswordRepeated">
          <Form.Label>Retype Password</Form.Label>
          <Form.Control
            value={repeatPass}
            onChange={(e) => setRepeatPass(e.target.value)}
            type="password"
          />
        </Form.Group></div>)}
        {token ? (
          <FloatingLabel
            controlId="floatingTextarea2"
            label="A Little About Myself:"
            className="mt-3"
          >
            <Form.Control
              value={isAdmin? clickedUser.bio : bio}
              onChange={(e) => setBio(e.target.value)}
              // as="textarea"
              placeholder="User's Bio"
              style={{ height: "110px" }}
            />
          </FloatingLabel>
        ) : ("")}
      </div>
      <div className="right-col d-flex flex-column">
        <Form.Group className="mb-2" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={isAdmin? clickedUser.firstName : firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={isAdmin? clickedUser.lastName : lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            value={isAdmin? clickedUser.phone : phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
          />
        </Form.Group>
        {isAdmin? "":
        (<Button
          type="submit"
          variant="primary"
          onClick={token? saveUserDetails : signupUser}
          className={token? "w-50 mt-5 mx-auto align-self-end":"w-50 mt-2 align-self-end"}
        >
          {token ? "Save" : "Signup"}
        </Button>)
}
      </div>
    </Form>
  );
}

export default SignupForm;
