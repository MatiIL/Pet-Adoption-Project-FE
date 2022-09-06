import { Container, Row, Col } from "react-bootstrap";
import PetCard from "./PetCard";

function SearchPetResults(props) {
  const { petsList } = props;

  return (
    <div id="srch-res">
      <Container className="mt-5">
        <Row className="mt-5">
          {petsList &&
            petsList.map((pet) => (
              <Col key={pet.petId} md={3}>
                <PetCard pet={pet} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default SearchPetResults;
