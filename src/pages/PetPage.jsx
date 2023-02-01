import { usePetsContext } from "../context/PetsContext"
import { useAuthContext } from "../context/AuthContext"
import { React, useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { Button, ButtonGroup, Form, Modal, Spinner } from "react-bootstrap"
import PetForm from "../components/PetForm"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function PetPage({ savedPets }) {
  const { getPet, pet, savePet, removePet, adoptOrFoster, returnPet, updatedPet } =
    usePetsContext();
  const { token, loggedUser, isAdmin, showSpinner } = useAuthContext();
  const currentStatus = pet.adoptionStatus;
  const userId = loggedUser.userId;
  const petOwner = pet.ownerId;
  const navigate = useNavigate();
  const param = useParams();
  const petId = param.petId;
  const [isChecked, setIsChecked] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [confirmPetReturn, setConfirmPetReturn] = useState(false);

  const location = useLocation();
  const userPetsList = location.state;

  const petType = pet.type === '1' ? "cat" : "dog";

  const toggleCheck = () => {
    setIsChecked((prev) => !prev);
    if (isChecked) {
      removePet(petId);
      toast.success("Pet removed from your favourites", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      savePet(petId);
      toast.success("Pet added to your favourites", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const ConfirmOrCancelReturn = ({ closeToast, ownerDecision }) => (
    <div>
      Are you sure that you wish to return {pet.name}?
      <button
        className="ms-2 me-2"
        onClick={() => {
          ownerDecision("yes");
          closeToast();
        }}
      >
        Yes
      </button>
      <button onClick={closeToast} className="ms-2">
        No
      </button>
    </div>
  );

  const handleClick = (e) => {
    const userPetAction = {
      petId: petId,
      action: e.target.innerText,
    };
    if (e.target.innerText === "Return") {
      const ownerDecision = (response) => {
        if (response === "yes") {
          returnPet(petId);
          toast.success("Return request will be proccessed within a few days", {
            position: "top-center",
            autoClose: 7000,
            onClose: () => window.location.reload(),
          });
        } else return;
      };
      toast.warning(<ConfirmOrCancelReturn ownerDecision={ownerDecision} />, {
        autoClose: false,
      });
    } else {
      adoptOrFoster(userPetAction);
      toast.success(
        `Congratulations on your choice to ${userPetAction.action.toLowerCase()} ${
          pet.name
        }!`,
        {
          position: "top-center",
          autoClose: 7000,
          onClose: () => window.location.reload(),
        }
      );
    }
  };

  const closeModal = () => {
    setLgShow(false);
  };

  const openModal = () => {
    if (isAdmin) setLgShow(true);
  };

  useEffect(() => {
    getPet(petId);
  }, []);

  useEffect(() => {
    const savedPets = userPetsList.userPetsList[1];
    const isPetOnUserList = (savedPets.find(item => item.petId == petId));
    if (isPetOnUserList) {
      setIsChecked(true);
    }
  }, []);

  useEffect(() => {
    if (updatedPet) {
      toast.success("Pet successfuly edited!", {
        autoClose: 7000,
      });
    }
  }, [updatedPet]);

  let petStatus = "";
  switch (pet.adoptionStatus) {
    case "1":
      petStatus = "Available";
      break;
    case "2":
      petStatus = "Fostered";
      break;
    case "3":
      petStatus = "Adopted";
      break;
    default:
      petStatus = "TBD";
  }

  return (
    <div className="pet-page">
      <div className="pet-page-header d-flex justify-content-between">
        <span
          className="back-to-search mb-3 material-symbols-outlined top-25 start-0 d-flex mt-4 ms-2"
          onClick={() => navigate(-1)}
        >
          arrow_back_ios_new
        </span>
        {isAdmin ? (
          <Button
            variant="outline-secondary"
            className="edit-pet ms-4 mt-3 h-25"
            onClick={openModal}
          >
            Edit Pet
          </Button>
        ) : (
          ""
        )}

        <Modal
          size="lg"
          show={lgShow}
          onHide={closeModal}
          aria-labelledby="example-modal-sizes-title-lg"
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Edit Pet
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PetForm petId={petId} handleClose={closeModal} />
          </Modal.Body>
        </Modal>
        {showSpinner ? <Spinner animation="grow" className="mt-3 ms-5" /> : ""}
        <h2 className="mx-auto pt-3 fw-semibold">
          Hello! my name is {pet.name} and I'm a {
          pet.breed && (pet.breed).includes('mixed') ?
          `${pet.breed} ${petType}` : pet.breed
          }{" "}
        </h2>
      </div>
      <div className="pet-content d-flex">
        <div className="pets-details d-flex justify-content-center">
          <div className="details-and-actions d-flex sticky-sm-bottom">
            <ul className="list-group list-group-flush w-75 mt-5 me-2 d-flex fw-semibold">
              <li className="list-group-item text-start">
                Status: {petStatus}
              </li>
              <li className="list-group-item text-start">
                Hypoallergenic? {pet.hypoallergnic ? "yes" : "no"}
              </li>
              <li className="list-group-item text-start">
                Dietary restrictions: {pet.dietary}
              </li>
              <li className="list-group-item text-start">Color: {pet.color}</li>
              <li className="list-group-item text-start">
                Height: {pet.height}
              </li>
              <li className="list-group-item text-start">
                Weight: {pet.weight}
              </li>
            </ul>
            <div className="btns-and-checkbox mt-5 fw-semibold">
              {showSpinner ? <Spinner animation="grow" /> : ""}
              <div
                className={
                  token
                    ? "save d-flex flex-row-reverse justify-content-end m-2 w-100 bg-light bg-opacity-75 p-2"
                    : ""
                }
              >
                <label className={token ? "visible ms-2" : "visually-hidden"}>
                  {isChecked ? "Remove from My Pets" : "Save to My Pets"}
                </label>
                <Form.Check
                  className={token ? "visible" : "visually-hidden"}
                  type="checkbox"
                  checked={isChecked}
                  onChange={toggleCheck}
                />
              </div>
              {showSpinner ? <Spinner animation="grow" /> : ""}
              <ButtonGroup className="pet-actions mt-2 ms-2">
                <Button
                  variant="outline-secondary"
                  className={
                    token && currentStatus === "1" ? "visible" : "d-none"
                  }
                  onClick={handleClick}
                >
                  Foster
                </Button>
                <Button
                  variant="outline-secondary"
                  className={
                    token && (currentStatus === "1" || currentStatus === "2")
                      ? "visible ms-2"
                      : "d-none"
                  }
                  onClick={handleClick}
                >
                  Adopt
                </Button>
                <Button
                  variant="outline-secondary"
                  className={
                    token && petOwner === userId ? "visible ms-2" : "d-none"
                  }
                  onClick={handleClick}
                >
                  Return
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <ToastContainer />
        <div className="img-box text-center">
          <img
            src={pet.picture}
            alt="pet"
            className="img-fluid mt-4 border border-2 rounded-pill"
            style={{ height: "280px", objectFit: "cover" }}
          />
          <div className="pets-bio mt-3 w-75 mx-auto fw-semibold p-2 rounded bg-light ">
            {pet.bio}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetPage;
