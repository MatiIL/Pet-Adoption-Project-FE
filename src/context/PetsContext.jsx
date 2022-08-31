import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const PetsContext = createContext(true);

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {
  const petsRoute = "http://localhost:8080/pets";
  const [petsList, setPetsList] = useState([]);
  const [pet, setPet] = useState({});

  // const convertPetStatus = () => {
  //   let petStatus = "";
  //   switch (pet.adoptionStatus) {
  //     case "1":
  //       petStatus = "Available";
  //       break;
  //     case "2":
  //       petStatus = "Fostered";
  //       break;
  //     case "3":
  //       petStatus = "Adopted";
  //       break;
  //     default:
  //       petStatus = "TBD";
  //   }
  //   return petStatus;
  // };

  const fetchPets = async (userInput) => {
    try {
      const res = await axios.get(
        `${petsRoute}/search`,
        { params: userInput },
        { withCredentials: true }
      );
      const petSearch = res.data;
      setPetsList(petSearch);
    } catch (error) {
      console.log(error);
    }
  };

  const getPet = async (petId) => {
    try {
      const res = await axios.get(`${petsRoute}/${petId}`);
      setPet(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserList = async (userInput) => {
    const route = (userInput.action)? 
    axios.post(`${petsRoute}/save/${userInput.petId}`):axios.delete(`${petsRoute}/save/${userInput.petId}`) 
    try {
      const res = await route;
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <PetsContext.Provider value={{ fetchPets, petsList, getPet, pet, updateUserList }}>
      {children}
    </PetsContext.Provider>
  );
}
