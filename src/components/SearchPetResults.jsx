import { usePetsContext } from "../context/PetsContext"
import { useAuthContext } from "../context/AuthContext"
import { useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import PetCard from "./PetCard"

function SearchPetResults(props) {
  const { petsList } = props;
  const { getUserPets, userPetsList } = usePetsContext();
  const { loggedUser } = useAuthContext();
  let savedPets = [];

  useEffect(() => {
    getUserPets(loggedUser.userId);
  }, []);

  return (
    <div id="srch-res">
      <Container className="mt-5">
        <Row className="mt-5">
          {petsList &&
            petsList.map((pet) => (
              <Col key={pet.petId} md={3}>
                <PetCard pet={pet} savedPets={savedPets} userPetsList={userPetsList}/>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default SearchPetResults;
