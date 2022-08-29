import axios from 'axios'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PetPage() {
    let navigate = useNavigate();
    const [pet, setPet] = useState({});
    const param = useParams();
    const petId = param.petId;
    const petByIdRoute = `http://localhost:8080/pets/${petId}`;
    
    const getPet = async () => {
        try {
          const res = await axios.get(petByIdRoute);
          console.log(res.data);
          setPet(res.data);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        getPet(petId);
    }, []);

    let petStatus = '';
  switch(pet.adoptionStatus) {
    case ('1'):
      petStatus = "Available";
      break;
    case ('2'):
      petStatus = "Fostered";
        break;
    case ('3'):
      petStatus = "Adopted";
          break;
    default: 
      petStatus = "TBD";
  }

    return (
        <div className="pet-page">
            <h2 className="mt-4">Hello! my name is {pet.name} and I'm a {pet.breed} {pet.type === '1'? 'Cat':'Dog'}.</h2>
            <div className="pets-details d-flex justify-content-center">
            
                <div className="back-to-search position-absolute top-25 start-0 d-flex ms-2"><span className="material-symbols-outlined"
                onClick={() => 
                    navigate("/FindPet")}
                >arrow_back_ios_new</span>
                
               </div>
           <ul className="list-group list-group-flush w-50 mt-5 me-2 d-flex">
                <li className="list-group-item text-start">Status: {petStatus}</li>
                <li className="list-group-item text-start">Hypoallergenic? {pet.hypoallergnic? 'yes':'no'}</li>
                <li className="list-group-item text-start">Dietary restrictions: {pet.dietary}</li>
                <li className="list-group-item text-start">Color: {pet.color}</li>
                <li className="list-group-item text-start">Height: {pet.height}</li>
                <li className="list-group-item text-start">Weight: {pet.weight}</li>
                
            </ul>
            
            <div className="img-box text-center">
            <img src={pet.picture} alt="pet" className="img-fluid mt-4 border border-2 rounded-pill"
            style={{height: '280px', objectFit: 'cover'}}/>
            <div className="pets-bio mt-3 w-75 mx-auto">{pet.bio}</div>
           </div>
           </div>
            
        </div>

    )
}

export default PetPage;