import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import PetForm from "./PetForm"
import { useAuthContext } from "../context/AuthContext"

function PetModal() {
  const { isAdmin } = useAuthContext();
  const [lgShow, setLgShow] = useState(false);

  const handleClose = () => {
    setLgShow(false);
  };

  const handleClick = () => {
    if (isAdmin) setLgShow(true);
  };

  return (
    <>
      <Button variant="outline-secondary" 
       onClick={handleClick}
       >
       Add New Pet
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add a New Pet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-evenly">
          <PetForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PetModal;
