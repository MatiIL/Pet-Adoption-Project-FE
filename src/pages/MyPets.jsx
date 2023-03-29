import { useAuthContext } from "../context/AuthContext"
import PetCard from "../components/PetCard"
import { Container, Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import { usePetsContext } from "../context/PetsContext"
import instance from "../context/AxiosContext"

function MyPets() {
  const { token, ownedPets, savedPets } = useAuthContext();
  const [savedPetsData, setSavedPetsData] = useState([]);

  const getAllSavedPets = async () => {
    const res = await instance.get("/users/saved-pets");
    let savedArray = [];
    for (let petId of res.data) {
      const pet = await instance.get(`/pets/${petId}`);
      savedArray.push(pet.data);
    }
    setSavedPetsData(savedArray);
  };
  
  useEffect(() => {
    try {
      getAllSavedPets();
      // getAllOwnedPets();
      // console.log("ownedPets", ownedPets);
    } catch (err) {
      console.log(err.messasge);
    }
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
            <Container className="owned-pets-container mt-2 w-50">
              <h2 className="bg-light bg-opacity-75 w-50 ms-4">Pets You Own</h2>
              <Row className="owned-pets ms-3 mt-3">
                {ownedPets &&
                  ownedPets.map((pet) => (
                    <Col key={pet._id} md={6}>
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
                {savedPetsData.length &&
                  savedPetsData.map((pet) => (
                    <Col key={pet._id} md={5}>
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
