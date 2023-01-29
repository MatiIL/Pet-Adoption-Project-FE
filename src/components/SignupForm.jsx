import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function SignupForm(props) {
  const { closeSignup, wasUserClicked, signupAttempt, editAttempt } = props;
  const {
    authNewUser,
    registeredUser,
    token,
    loggedUser,
    updateUserDetails,
    updatedUser,
    emailTaken,
    didUserUpdate,
    fullUserInfo,
    isAdmin,
    showSpinner,
  } = useAuthContext();
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
      setBio(loggedUser.bio != null ? loggedUser.bio : "");
    }
    if (didUserUpdate) {
      setEmail(updatedUser.email);
      setFirstName(updatedUser.firstName);
      setLastName(updatedUser.lastName);
      setPhone(updatedUser.phone);
      setBio(updatedUser.bio != null ? updatedUser.bio : "");
    }
  }, [token, didUserUpdate]);

  const signupUser = async (e) => {
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
      await authNewUser(newUser);
      if (registeredUser) {
        closeSignup();
        signupAttempt(1);
      } else {
        signupAttempt(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveUserDetails = async (e) => {
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
      await updateUserDetails(newDetails);
    } catch (err) {
      editAttempt(3);
      console.error(err);
    }
  };

  useEffect(() => {
    if (didUserUpdate && !emailTaken) {
      console.log(didUserUpdate, updatedUser, "updated")
      editAttempt(1);
    } else if (emailTaken) {
      editAttempt(2);
    }
  }, [didUserUpdate, emailTaken])

  return (
    <Form className="d-flex justify-content-evenly">
      <div className="left-col d-flex flex-column">
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label className="user-form-label">Email Address</Form.Label>
          <Form.Control
            value={isAdmin && wasUserClicked ? clickedUser.email : email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@example.com"
            autoFocus
          />
        </Form.Group>
        {isAdmin && wasUserClicked ? (
          <div className="d-flex flex-column justify-content-evenly mt-2">
            <u>User Pets</u>
            {clickedUserPets.map((pet) => (
              <ul key={pet.petId} className="mt-2">
                <li className="d-flex justify-content-between">
                  <div>Name: {pet.name}</div>
                  <div>Pet ID: {pet.petId}</div>
                </li>
              </ul>
            ))}
          </div>
        ) : (
          <div className="set-password">
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label className="user-form-label">Password</Form.Label>
              <Form.Control
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPasswordRepeated">
              <Form.Label className="user-form-label">
                Retype Password
              </Form.Label>
              <Form.Control
                value={repeatPass}
                onChange={(e) => setRepeatPass(e.target.value)}
                type="password"
              />
            </Form.Group>
          </div>
        )}
        {token ? (
          <FloatingLabel
            controlId="floatingTextarea2"
            label="A Little About Myself:"
            className="mt-3"
          >
            <Form.Control
              value={isAdmin && wasUserClicked ? clickedUser.bio : bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="User's Bio"
              style={{ height: "110px" }}
            />
          </FloatingLabel>
        ) : (
          ""
        )}
      </div>
      <div className="right-col d-flex flex-column">
        <Form.Group className="mb-2" controlId="formBasicFirstName">
          <Form.Label className="user-form-label">First Name</Form.Label>
          <Form.Control
            value={
              isAdmin && wasUserClicked ? clickedUser.firstName : firstName
            }
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicLastName">
          <Form.Label className="user-form-label">Last Name</Form.Label>
          <Form.Control
            value={isAdmin && wasUserClicked ? clickedUser.lastName : lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicPhone">
          <Form.Label className="user-form-label">Phone Number</Form.Label>
          <Form.Control
            value={isAdmin && wasUserClicked ? clickedUser.phone : phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
          />
        </Form.Group>
        <div className="spinner-and-btn d-flex justify-content-evenly">
          {showSpinner ? (
            <Spinner className="mt-2 me-3" animation="grow" />
          ) : (
            ""
          )}
          {isAdmin && wasUserClicked ? (
            ""
          ) : (
            <Button
              id="register-btn"
              type="submit"
              variant="success"
              onClick={token ? saveUserDetails : signupUser}
              className={
                token
                  ? "w-75 mt-5 mx-auto align-self-end"
                  : "w-75 mt-2 align-self-end"
              }
            >
              {token ? "Save" : "Signup"}
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}

export default SignupForm;
