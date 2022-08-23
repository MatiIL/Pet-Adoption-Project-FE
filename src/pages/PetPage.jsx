import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

function PetPage() {
    let navigate = useNavigate();
    const pet =  {
        "type": "Dog",
        "name": "Bradley",
        "adoptionStatus": "Adopted",
        "picture": "",
        "height": 14,
        "weight": 75,
        "color": "White/Blue",
        "bio": 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia fugiat, impedit, tenetur facilis nisi beatae harum laboriosam repellat deleniti eligendi officiis ipsam debitis aliquam recusandae eius tempora sed doloremque',
        "hypoallergnic": false,
        "dietary": "Meat, vegetables, grains, and fruits.",
        "breed": "Pit Bull Mix"
      }

    return (
        <div className="pet-page">
            <h2 className="mt-4">Hello! my name is {pet.name} and I'm a {pet.breed} {pet.type}.</h2>
            <div className="pets-details d-flex justify-content-center">
            
                <div className="back-to-search position-absolute top-25 start-0 d-flex ms-2"><span className="material-symbols-outlined"
                onClick={() => 
                    navigate("/FindPet")}
                >arrow_back_ios_new</span>
                
               </div>
           <ul className="list-group list-group-flush w-25 mt-5 me-2 d-flex">
                <li className="list-group-item text-start">Status: {pet.adoptionStatus}</li>
                <li className="list-group-item text-start">Hypoallergenic: {pet.hypoallergnic? 'Yes':'No'}</li>
                <li className="list-group-item text-start">Dietary: {pet.dietary}</li>
                <li className="list-group-item text-start">Color: {pet.color}</li>
                <li className="list-group-item text-start">Height: {pet.height}</li>
                <li className="list-group-item text-start">Weight: {pet.weight}</li>
                
            </ul>
            
            <div className="img-box text-center">
            <img src="../../anotherDog.jpg" alt="pet" className="img-fluid mt-4 border border-2 rounded-pill"/>
            <div className="pets-bio mt-5 w-75 mx-auto">{pet.bio}</div>
           </div>
           </div>
            
        </div>

    )
}

export default PetPage;