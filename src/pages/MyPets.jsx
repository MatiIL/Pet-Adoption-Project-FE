import { usePetsContext } from "../context/PetsContext";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import PetCard from "../components/PetCard";
import { Container, Row, Col, Card } from "react-bootstrap";

function MyPets() {
  const { token, loggedUser } = useAuthContext();
  const { getUserPets, userPetsList } = usePetsContext();
  const userId = loggedUser.userId;
  const ownedPets = userPetsList[0];
  const savedPets = userPetsList[1];

  useEffect(() => {
    getUserPets(userId);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center mt-3">
      {token ? "" : <h1>You currently do not own or foster any pets</h1>}
      <div className="all-pets d-flex justify-content-center">
        <Container className="mt-2">
          {token ? <h2>Pets You Own</h2> : ""}
          <Row className="mt-3 w-50">
            {ownedPets &&
              ownedPets.map((pet) => (
                <Col key={pet.petId} md={10}>
                  <PetCard pet={pet} />
                </Col>
              ))}
          </Row>
        </Container>

        <Container className="mt-2 w-75">
          {token ? <h2>Your Saved Pets List</h2> : ""}
          <Row className="mt-3">
            {savedPets &&
              savedPets.map((pet) => (
                <Col key={pet.petId} md={5}>
                  <PetCard pet={pet} />
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default MyPets;
