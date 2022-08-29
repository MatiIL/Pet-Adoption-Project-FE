import { Container, Row, Col } from "react-bootstrap";
import PetCard from './PetCard';
// import { usePetsContext } from '../context/PetsContext';

function SearchPetResults(props) {
    // const { fetchPets, petsList } = usePetsContext();
    const { petsList } = props;
    
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