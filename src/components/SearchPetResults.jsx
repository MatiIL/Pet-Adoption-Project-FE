import { Container, Row, Col } from "react-bootstrap";
import PetCard from './PetCard';
// import { usePetsContext } from '../context/PetsContext';

function SearchPetResults(props) {
    // const { fetchPets, petsList } = usePetsContext();
    // const { petsList } = props;

    const petsArray = [
      {
        "type": "Dog",
        "name": "Bradley",
        "adoptionStatus": "Adopted",
        "picture": "",
        "height": 14,
        "weight": 75,
        "color": "White/Blue",
        "bio": "",
        "hypoallergnic": false,
        "dietery": [],
        "breed": "Pit Bull Mix"
      },
      {
        "type": "Cat",
        "name": "Rajah",
        "adoptionStatus": "Adopted",
        "picture": "",
        "height": 4,
        "weight": 65,
        "color": "Brown Tabby",
        "bio": "",
        "hypoallergnic": true,
        "dietery": [],
        "breed": "Domestic Shorthair Mix"
      },
      {
        "type": "Cat",
        "name": "Pebbles",
        "adoptionStatus": "Adopted",
        "picture": "",
        "height": 84,
        "weight": 75,
        "color": "Calico",
        "bio": "",
        "hypoallergnic": true,
        "dietery": [],
        "breed": "Domestic Shorthair Mix"
      },
      {
        "type": "Dog",
        "name": "Johnny",
        "adoptionStatus": "Adopted",
        "picture": "",
        "height": 66,
        "weight": 88,
        "color": "Blue/White",
        "bio": "",
        "hypoallergnic": true,
        "dietery": [],
        "breed": "Pit Bull"
      }];
    
  return (
    <div id='srch-res'>
    <Container className="mt-5">
      <Row className="mt-5">
        {petsArray &&
          petsArray.length > 0 &&
          petsArray.map((pet) => (
            <Col key={pet.height * pet.weight} md={3}>
              <PetCard pet={pet}/>
            </Col>
))}
      </Row>
    </Container>
    </div>
  );
}

export default SearchPetResults;