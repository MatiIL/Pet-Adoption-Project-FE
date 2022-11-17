import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SignupModal from "./SignupModal";
import { useAuthContext } from "../context/AuthContext";

function LoginModal() {
  const { loggedUser, loginUser } = useAuthContext();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    const logAttempt = {
      email: email,
      password: pass,
    };
    try {
      await loginUser(logAttempt);
      if (loggedUser) {
        handleClose();
        // window.location.reload();
      }
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
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPass(e.target.value)}
              />
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
          </div>
          <SignupModal handleClose={handleClose}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
