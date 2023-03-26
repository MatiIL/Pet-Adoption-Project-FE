import { useAuthContext } from "../context/AuthContext"
import PetCard from "../components/PetCard"
import { Container, Row, Col } from "react-bootstrap"

function MyPets() {
  const { token } = useAuthContext();
  const savedPets = localStorage.getItem("savedPets") !== "undefined" ? 
  JSON.parse(localStorage.getItem("savedPets")) : [];
  const ownedPets = localStorage.getItem("fosteredPets") !== "undefined" ?
  JSON.parse(localStorage.getItem("fosteredPets")) : [];

  return (
    <div className="d-flex flex-column justify-content-center mt-3">
      {ownedPets && ownedPets.length > 0 ? (
        ""
      ) : (
        <h1>You currently do not own or foster any pets</h1>
      )}
      <div className="all-pets d-flex justify-content-evenly">
        {ownedPets && ownedPets.length > 0 ? (
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
            ) : ""
        }
            {savedPets && savedPets.length > 0 ? (
              <Container className="saved-pets mt-2 w-50">
              {token ? (
                <h2 className="bg-light bg-opacity-75 w-75">
                  Your Saved Pets List
                </h2>
              ) : (
                ""
              )}
              <Row className=" mt-3">
                {savedPets.length &&
                  savedPets.map((pet) => (
                    <Col key={pet.petId} md={5}>
                      <PetCard pet={pet} />
                    </Col>
                  ))}
              </Row>
            </Container>

            ) : ""
          }  
      </div>
    </div>
  );
}

export default MyPets;
