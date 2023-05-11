import { Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import {  convertPetStatus } from '../Utils'

function PetCard(props) {
  const { pet } = props;
  const { token, getAllOwnedPets } = useAuthContext();

  const navigate = useNavigate();

  const seeMore = async () => {
    if (token) {
      await getAllOwnedPets();
      navigate(`/PetPage/${pet._id}`, { state: {pet} });
    } else navigate(`/PetPage/${pet._id}`, { state: {pet} });
  }
  
  return (
    <Card className="mb-3">
      <Card.Img
        variant="top"
        src={pet.imageUrl}
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="fs-5">{pet.name}</Card.Title>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-around">
        <small className="text-muted border border-dark rounded-pill p-2">
          {convertPetStatus(pet.adoptionStatus)}
        </small>
        <Button
          onClick={seeMore}
          id="see-more"
          className="mt-2 btn-sm btn-light rounded-pill"
        >
          SEE MORE
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default PetCard;
