import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

function PetCard(props) {
  const { pet, userPetsList } = props;

  const convertPetStatus = (num) => {
    let petStatus = "";
  switch (num) {
    case "1":
      petStatus = "Available";
      break;
    case "2":
      petStatus = "Fostered";
      break;
    case "3":
      petStatus = "Adopted";
      break;
  }
  return petStatus;
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
        <Link
          to={`/PetPage/${pet._id}`}
          id="see-more"
          className="links mt-2 link-dark text-decoration-none"
          state={{ userPetsList }}
        >
          SEE MORE
        </Link>
      </Card.Footer>
    </Card>
  );
}

export default PetCard;
