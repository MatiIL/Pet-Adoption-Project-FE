import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import PetForm from "./PetForm"
import { useAuthContext } from "../context/AuthContext"

function PetModal() {
  const { isAdmin } = useAuthContext();
  const [editPet, setEditPet] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [petId, setPetId] = useState(0)

  useEffect(() => {
    const endOfPath = window.location.pathname.slice(-1);
    if (!isNaN(endOfPath)) {
      const exctractId = window.location.pathname.match(/\d+/g);
      const petIdNumber = parseInt(exctractId[0]);
      setPetId(petIdNumber);
      setEditPet(true);
    }
  }, []);

  const handleClose = () => {
    setLgShow(false);
  };

  const handleClick = () => {
    if (isAdmin) setLgShow(true);
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={handleClick}>
        {editPet ? "Edit Pet" : "Add New Pet"}
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
            {editPet ? "Edit Pet" : "Add a New Pet"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PetForm petId={petId} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PetModal;
