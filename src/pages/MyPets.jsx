import { usePetsContext } from "../context/PetsContext";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import PetCard from "../components/PetCard";
import { Container, Row, Col } from "react-bootstrap";

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
      {ownedPets && ownedPets.length > 0 ? (
        ""
      ) : (
        <h1>You currently do not own or foster any pets</h1>
      )}
      <div className="all-pets d-flex justify-content-evenly">
        {ownedPets && ownedPets.length > 0 ? (
          <div className="d-flex">
            <Container className="owned-pets-container mt-2 w-50">
              <h2 className="bg-light bg-opacity-75 w-50 ms-4">Pets You Own</h2>
              <Row className="owned-pets ms-3 mt-3">
                {ownedPets &&
                  ownedPets.map((pet) => (
                    <Col key={pet.petId} md={6}>
                      <PetCard pet={pet} />
                    </Col>
                  ))}
              </Row>
            </Container>

            <Container className="saved-pets mt-2 w-50">
              {token ? (
                <h2 className="bg-light bg-opacity-75 w-75">
                  Your Saved Pets List
                </h2>
              ) : (
                ""
              )}
              <Row className=" mt-3">
                {savedPets &&
                  savedPets.map((pet) => (
                    <Col key={pet.petId} md={5}>
                      <PetCard pet={pet} />
                    </Col>
                  ))}
              </Row>
            </Container>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MyPets;
