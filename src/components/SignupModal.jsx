import Modal from "react-bootstrap/Modal"
import SignupForm from "./SignupForm"
import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SignupModal(props) {
  const { handleClose } = props;
  const [show, setShow] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const closeSignup = () => {
    setShow(false);
  }
  
  const handleShow = () => {
    setShow(true);
  }

  const signupAttempt = (num) => {
    if (num === 1) {
      toast.success("Signup confirmed! now login with your registered email & password",
      {
        autoClose: 7000,
      });
    }
    if (num === 0) {
      setShowTooltip(true);
      toast.error("Unsuccessful Signup!",
      {
        autoClose: 7000,
        onClose: () => setShowTooltip(false)
      });
    }
  }

  return (
    <>
      <a href='#' className='links mt-2 link-dark text-decoration-none' onClick={handleShow}>
        Need an account? <u className="clickable-singup">SIGN UP</u></a>
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
          <SignupForm 
          closeSignup={closeSignup}
          signupAttempt={signupAttempt}
          showTooltip={showTooltip}
          />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end">
        
          <div className="buttons">
            <Button variant="secondary" className=" me-5" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <ToastContainer className="signup-toast"/>
    </>
  );
}

export default SignupModal;
