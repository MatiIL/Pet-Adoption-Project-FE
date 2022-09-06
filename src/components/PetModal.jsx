import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PetForm from "./PetForm";
import { usePetsContext } from "../context/PetsContext";
import { useAuthContext } from "../context/AuthContext";

function PetModal({ pet }) {
  const { isAdmin } = useAuthContext();
  const [editPet, setEditPet] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [petId, setPetId] = useState()

  useEffect(() => {
    const endOfPath = window.location.pathname.slice(-1);
    if (!isNaN(endOfPath)) {
      const firstStep = window.location.pathname.match(/\d+/g);
      const secondStep = parseInt(firstStep[0]);
      setPetId(secondStep);
      setEditPet(true);
    }
  }, []);

  const handleClose = () => {
    setLgShow(false);
  };

  const handleClick = () => {
    // setClickedPetValues(true);
    setLgShow(true);
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
