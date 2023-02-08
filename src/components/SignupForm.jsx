import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Tooltip } from "react-tooltip";

function SignupForm(props) {
  const {
    closeSignup,
    wasUserClicked,
    signupAttempt,
    editAttempt,
    showTooltip,
  } = props;
  const {
    authNewUser,
    signupError,
    passesNoMatch,
    setPassesNoMatch,
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

  const [validInputs, setValidInputs] = useState({
    validEmail: false,
    validPass: false,
    validRepeat: false,
    validFirstName: false,
    validLastName: false,
    validPhone: false,
  });

  const [invalidInputs, setInvalidinputs] = useState({
    invalidEmail: false,
    invalidPass: false,
    invalidRepeat: false,
    invalidFirstName: false,
    invalidLastName: false,
    invalidPhone: false,
  });

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

  const handleFormChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
        ) {
          setInvalidinputs({ ...invalidInputs, invalidEmail: false });
          setValidInputs({ ...validInputs, validEmail: true });
        } else {
          setValidInputs({ ...validInputs, validEmail: false });
          setInvalidinputs({ ...invalidInputs, invalidEmail: true });
        }
        break;
      case "password":
        setPass(e.target.value);
        if ((e.target.value).length > 2) {
          setInvalidinputs({ ...invalidInputs, invalidPass: false });
          setValidInputs({ ...validInputs, validPass: true });
          if (repeatPass.length && e.target.value !== repeatPass) {
            setValidInputs({ ...validInputs, validRepeat: false });
            setInvalidinputs({ ...invalidInputs, invalidRepeat: true });
          } else if (repeatPass.length && e.target.value === repeatPass) {
            setInvalidinputs({ ...invalidInputs, invalidRepeat: false });
            setValidInputs({ ...validInputs, validRepeat: true });
          }
        } else {
          setValidInputs({ ...validInputs, validPass: false });
          setInvalidinputs({ ...invalidInputs, invalidPass: true });
          if (repeatPass.length && e.target.value !== repeatPass) {
            setValidInputs({ ...validInputs, validRepeat: false });
            setInvalidinputs({ ...invalidInputs, invalidRepeat: true });
          } else if (repeatPass.length && e.target.value === repeatPass) {
            setInvalidinputs({ ...invalidInputs, invalidRepeat: false });
            setValidInputs({ ...validInputs, validRepeat: true });
          }
        }
        break;
      case "repeat-password":
        setRepeatPass(e.target.value);
        if ((e.target.value).length && e.target.value === pass) {
          setInvalidinputs({ ...invalidInputs, invalidRepeat: false });
          setValidInputs({ ...validInputs, validRepeat: true });
          setPassesNoMatch(false);
        } else {
          setValidInputs({ ...validInputs, validRepeat: false });
          setInvalidinputs({ ...invalidInputs, invalidRepeat: true });
        }
        break;
      case "first-name":
        setFirstName(e.target.value);
        if (e.target.value.length > 1) {
          setInvalidinputs({ ...invalidInputs, invalidFirstName: false });
          setValidInputs({ ...validInputs, validFirstName: true });
        } else {
          setValidInputs({ ...validInputs, validFirstName: false });
          setInvalidinputs({ ...invalidInputs, invalidFirstName: true });
        }
        break;
      case "last-name":
        setLastName(e.target.value);
        if (e.target.value.length > 1) {
          setInvalidinputs({ ...invalidInputs, invalidLastName: false });
          setValidInputs({ ...validInputs, validLastName: true });
        } else {
          setValidInputs({ ...validInputs, validLastName: false });
          setInvalidinputs({ ...invalidInputs, invalidLastName: true });
        }
        break;
      case "phone":
        setPhone(e.target.value);
        if (e.target.value.length > 8) {
          setInvalidinputs({ ...invalidInputs, invalidPhone: false });
          setValidInputs({ ...validInputs, validPhone: true });
        } else {
          setValidInputs({ ...validInputs, validPhone: false });
          setInvalidinputs({ ...invalidInputs, invalidPhone: true });
        }
        break;
    }
  };

  const handleUndefined = () => {
    if (email === "")
      setInvalidinputs({ ...invalidInputs, invalidEmail: true });
    if (pass === "") setInvalidinputs({ ...invalidInputs, invalidPass: true });
    if (repeatPass === "")
      setInvalidinputs({ ...invalidInputs, invalidRepeat: true });
    if (firstName === "")
      setInvalidinputs({ ...invalidInputs, invalidFirstName: true });
    if (lastName === "")
      setInvalidinputs({ ...invalidInputs, invalidLastName: true });
    if (phone === "")
      setInvalidinputs({ ...invalidInputs, invalidPhone: true });
  };

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
    const inputsArray = Object.values(newUser);
    if (inputsArray.includes("")) {
      handleUndefined();
      return;
    }
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
    };
    const inputsArray = Object.values(newDetails);
    if (inputsArray.includes("")) {
      handleUndefined();
      return;
    }
    newDetails.bio = bio;
    try {
      await updateUserDetails(newDetails);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (didUserUpdate && !emailTaken) {
      editAttempt(1);
    } else if (emailTaken) {
      editAttempt(2);
    } 
  }, [didUserUpdate, emailTaken]);

  return (
    <Form
      className={token ? 
        "d-flex justify-content-around" :
        "d-flex justify-content-between"}
    >
      <div className="left-col d-flex flex-column me-2">
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label
            className="user-form-label"
            id="email-anchor"
            data-tooltip-content={
              signupError.length && !passesNoMatch > 0 ? signupError : ""
            }
            data-tooltip-place="top"
          >
            <Tooltip
              anchorId="email-anchor"
              isOpen={showTooltip ? true : false}
            />
            Email Address
          </Form.Label>

          <Form.Control
            name="email"
            size="sm"
            value={isAdmin && wasUserClicked ? clickedUser.email : email}
            onChange={(e) => handleFormChange(e)}
            type="email"
            placeholder="name@example.com"
            autoFocus
            isValid={validInputs.validEmail}
            isInvalid={invalidInputs.invalidEmail}
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
                name="password"
                size="sm"
                value={pass}
                onChange={(e) => handleFormChange(e)}
                type="password"
                isValid={validInputs.validPass}
                isInvalid={invalidInputs.invalidPass}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPasswordRepeated">
              <Form.Label 
              className="user-form-label"
                >
                Retype Password
              </Form.Label>
              <Form.Control
                name="repeat-password"
                size="sm"
                value={repeatPass}
                onChange={(e) => handleFormChange(e)}
                type="password"
                isValid={validInputs.validRepeat}
                isInvalid={invalidInputs.invalidRepeat}
              />
            </Form.Group>
            {signupError.length && passesNoMatch ? (
              <span className="text-danger bg-white p-2">{signupError}</span>
            ) : (
              ""
            )}
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
      <div className="right-col d-flex flex-column ms-2">
        <Form.Group className="mb-2" controlId="formBasicFirstName">
          <Form.Label className="user-form-label">First Name</Form.Label>
          <Form.Control
            name="first-name"
            size="sm"
            value={
              isAdmin && wasUserClicked ? clickedUser.firstName : firstName
            }
            onChange={(e) => handleFormChange(e)}
            type="text"
            isValid={validInputs.validFirstName}
            isInvalid={invalidInputs.invalidFirstName}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicLastName">
          <Form.Label className="user-form-label">Last Name</Form.Label>
          <Form.Control
            name="last-name"
            size="sm"
            value={isAdmin && wasUserClicked ? clickedUser.lastName : lastName}
            onChange={(e) => handleFormChange(e)}
            type="text"
            isValid={validInputs.validLastName}
            isInvalid={invalidInputs.invalidLastName}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicPhone">
          <Form.Label className="user-form-label">Phone Number</Form.Label>
          <Form.Control
            name="phone"
            size="sm"
            value={isAdmin && wasUserClicked ? clickedUser.phone : phone}
            onChange={(e) => handleFormChange(e)}
            type="number"
            isValid={validInputs.validPhone}
            isInvalid={invalidInputs.invalidPhone}
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
