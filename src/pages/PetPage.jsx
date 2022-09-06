import { usePetsContext } from "../context/PetsContext";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

function PetPage() {
  
  const { getPet, pet, savePet, removePet, adoptOrFoster, returnPet } = usePetsContext();
  const { token, loggedUser } = useAuthContext();
  const currentStatus = pet.adoptionStatus;
  const userId = loggedUser.userId;
  const petOwner = pet.ownerId;
  let navigate = useNavigate();
  const param = useParams();
  const petId = param.petId;
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(prev => !prev);
    if (isChecked) {
      removePet(petId);
    } else savePet(petId); 
  };

  const handleClick = (e) => {
    const userPetAction = {
      petId: petId,
      action: e.target.innerText
    }
    if (e.target.innerText === "Return") {
      returnPet(petId);
      window.location.reload();
    } else {
      adoptOrFoster(userPetAction);
      window.location.reload();
     }
  }

  useEffect(() => {
    getPet(petId);
  }, []);

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
      <h2 className="mt-4">
        Hello! my name is {pet.name} and I'm a {pet.breed}{" "}
        {pet.type === "1" ? "Cat" : "Dog"}.
      </h2>
      
      <div className="pets-details d-flex justify-content-center">
        
        <div className="back-to-search position-absolute top-25 start-0 d-flex ms-2">
          <span
            className="material-symbols-outlined"
            onClick={() => navigate(-1)}
          >
            arrow_back_ios_new
          </span>
        </div>
        <ul className="list-group list-group-flush w-50 mt-5 me-2 d-flex">
          <li className="list-group-item text-start">Status: {petStatus}</li>
          <li className="list-group-item text-start">
            Hypoallergenic? {pet.hypoallergnic ? "yes" : "no"}
          </li>
          <li className="list-group-item text-start">
            Dietary restrictions: {pet.dietary}
          </li>
          <li className="list-group-item text-start">Color: {pet.color}</li>
          <li className="list-group-item text-start">Height: {pet.height}</li>
          <li className="list-group-item text-start">Weight: {pet.weight}</li>
          <ButtonGroup className="pet-actions mt-2 ms-2">
            <Button variant="outline-secondary"
            className={token && currentStatus === "1"? "visible":"d-none"} 
            onClick={handleClick}
            >Foster</Button>
            <Button variant="outline-secondary" 
            className={token && (currentStatus === "1" || currentStatus === "2")? "visible":"d-none"} 
            onClick={handleClick}
            >Adopt</Button>
            <Button variant="outline-secondary" 
            className={token && petOwner === userId? "visible":"d-none"} 
            onClick={handleClick}
            >Return</Button>
          </ButtonGroup>
          <div className="save d-flex flex-row-reverse justify-content-end m-2">
          <label className={token? "visible ms-2":"visually-hidden"}>Save to List</label>
          <Form.Check
            className={token? "visible":"visually-hidden"}
            type="checkbox"
            onChange={toggleCheck}
          />
          </div>
        </ul>
        <div className="img-box text-center">
          <img
            src={pet.picture}
            alt="pet"
            className="img-fluid mt-4 border border-2 rounded-pill"
            style={{ height: "280px", objectFit: "cover" }}
          />
          <div className="pets-bio mt-3 w-75 mx-auto">{pet.bio}</div>
        </div>
      </div>
    </div>
  );
}

export default PetPage;
