import Modal from "react-bootstrap/Modal";
import SignupForm from "./SignupForm";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function SignupModal(props) {
  const { handleClose } = props;
  const [show, setShow] = useState(false);
  const closeSignup = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (num) => {
    if(num === 1) setShow(false);
  }
  
  return (
    <>
      <a href="/#" className='links mt-2 link-dark text-decoration-none' onClick={handleShow}>
        Need an account? <u>SIGN UP</u>
      </a>
      <Modal
        id="sign-modal"
        show={show}
        onHide={handleClose}
        dialogClassName="modal-70w"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a New PAC Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm handleSubmit={handleSubmit} closeSignup={closeSignup}/>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end">
          <div className="buttons">
            <Button variant="secondary" className="me-3" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignupModal;
