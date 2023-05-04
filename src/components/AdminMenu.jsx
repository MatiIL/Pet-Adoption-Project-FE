import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Modal } from "react-bootstrap"
import { useState, useEffect } from 'react'
import PetForm from "../components/PetForm"
import { useAuthContext } from "../context/AuthContext"
import { usePetsContext } from '../context/PetsContext'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom"

function AdminMenu() {
  const [lgShow, setLgShow] = useState(false);
  const { isAdmin } = useAuthContext();
  const { addedPet } = usePetsContext();

  const closeModal = () => {
    setLgShow(false);
  };

  const openModal = () => {
    if (isAdmin) setLgShow(true);
  };

  useEffect(() => {
    if (addedPet) {
      toast.success("New pet added!", {
        autoClose: 7000,
      });
    }
  }, [addedPet]);

    return (
        <>
        <DropdownButton
        id="dropdown-button-dark-example2"
        variant="secondary"
        menuVariant="dark"
        title="Admin Tools"
        className=" p-2"
      >
        <Dropdown.Item as={Link} to="/UsersPage" className="ms-3" >
        See All Users
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/ManagePets" className="ms-3">See All Pets</Dropdown.Item>
        <Dropdown.Item to="#" className="ms-3" onClick={openModal }>
          Add Pet
          </Dropdown.Item>
        <Modal
          size="lg"
          show={lgShow}
          onHide={closeModal}
          aria-labelledby="example-modal-sizes-title-lg"
          backdrop="static"
        >
          
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Add Pet
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PetForm handleClose={closeModal} />
          </Modal.Body>
        </Modal>
        
      </DropdownButton>
      <ToastContainer />
    </>
  );
}

export default AdminMenu;