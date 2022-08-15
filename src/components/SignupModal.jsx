import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios"

function SignupModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newUser = {
        email: email,
        password: pass,
        repeatPassword: repeatPass,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      };
      console.log(newUser);
      const res = await axios.post("http://localhost:8080/users/signup", newUser);
      if (res.data) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
      Signup
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-70w">
        <Modal.Header closeButton>
          <Modal.Title>Create a New PAC Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex justify-content-between">
            <div className="left-col d-flex flex-column">
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-2" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
               value={pass}
               onChange={(e) => setPass(e.target.value)}
               type="password" />
            </Form.Group>
            <Form.Group
              className="mb-2" controlId="formBasicPasswordRepeated">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control 
              value={repeatPass}
              onChange={(e) => setRepeatPass(e.target.value)}
              type="password" />
            </Form.Group>
            </div>
            <div className="right-col d-flex flex-column">
            <Form.Group
              className="mb-2" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text" />
            </Form.Group>
            <Form.Group
              className="mb-2" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text" />
            </Form.Group>
            <Form.Group
              className="mb-2" controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number" />
            </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          
          <div className="buttons">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={
              handleSubmit}
              >
              Signup
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignupModal;
