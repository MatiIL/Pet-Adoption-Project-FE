import React, { useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import SignupModal from "./SignupModal"
import { useAuthContext } from "../context/AuthContext"
import { Tooltip } from "react-tooltip"

function LoginModal() {
  const { 
    loginUser, 
    showSpinner, 
    loginError, 
    wrongPass,
    setWrongPass,
    showTooltip, 
    setShowTooltip,
   } = useAuthContext();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleEmailChange = (e) => {
    setShowTooltip(false);
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setWrongPass(false);
    setPass(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const logAttempt = {
      email: email,
      password: pass,
    };
    try {
      await loginUser(logAttempt);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>
        Login/Signup
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login to Your PAC Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label
              id="email-anchor"
              data-tooltip-content={
                loginError.length > 0 ? loginError : ""
              }
              data-tooltip-place="top"
              >Email address</Form.Label>
              <Tooltip 
              anchorId="email-anchor"
              isOpen={showTooltip? true : false}
              />
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => handleEmailChange(e)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => handlePassChange(e)}
              />
              {
                loginError.length && wrongPass? (
                  <span className="text-danger bg-white p-2">{loginError}</span>
                ) : (
                  ""
                )

              }
              
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <div className="buttons">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleLogin}>
              Login
            </Button>
            {showSpinner ? 
          <Spinner className="mt-3 ms-3" animation="grow" />
          : ""
          }
          </div>
          <SignupModal handleClose={handleClose}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
