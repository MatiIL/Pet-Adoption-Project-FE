import { Container, Row, Col } from "react-bootstrap";
import PetCard from './PetCard';
import { useEffect } from "react";

function SearchPetResults(props) {
    const { petsList, searchPets } = props;

  return (
    <div id='srch-res'>
    <Container className="mt-5">
      <Row className="mt-5">
        {petsList &&
          petsList.length > 0 &&
          petsList.map((pet) => (
            <Col key={pet.petId} md={3}>
              <PetCard pet={pet}/>
            </Col>
))}
      </Row>
    </Container>
    </div>
  );
}

export default SearchPetResults;