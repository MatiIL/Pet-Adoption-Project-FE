import { createContext, useContext, useState } from "react"
import instance from "./AxiosContext"

export const PetsContext = createContext(true);

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {
  const petsRoute = "http://localhost:8080/pets";
  const [addedPet, setAddedPet] = useState(false);
  const [updatedPet, setUpdatedPet] = useState(false);
  const [petsList, setPetsList] = useState([]);
  const [pet, setPet] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);

  const addNewPet = async (petData) => {
    try {
      setShowSpinner(true);
      const res = await instance.post(petsRoute, petData);
      if (res.data) {
        setShowSpinner(false);
        setAddedPet(true);
      }
    } catch (error) {
      setShowSpinner(false);
      console.log(error);
    }
  };

  const fetchPets = async (userInput) => {
    try {
      setShowSpinner(true);
      const res = await instance.get(`${petsRoute}/search`, { params: userInput });
      const petSearch = res.data;
      setPetsList(petSearch);
      setShowSpinner(false);
    } catch (error) {
      setShowSpinner(false);
      console.log(error);
    }
  };

  const getPet = async (petId) => {
    try {
      setShowSpinner(true);
      const res = await instance.get(`${petsRoute}/${petId}`);
      setShowSpinner(false);
      setPet(res.data);
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  const savePet = async (petId) => {
    try {
      setShowSpinner(true);
      const res = await instance.post(`${petsRoute}/${petId}/save`, petId);
      setShowSpinner(false);
    } catch (err) {
      setShowSpinner(false);
      console.error(err);
      console.log("this will be replaced by err message at the UI");
    }
  };

  const removePet = async (petId) => {
    try {
      setShowSpinner(true);
      const res = await instance.delete(`${petsRoute}/${petId}/remove`);
      setShowSpinner(false);
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  const adoptOrFoster = async (userPetAction) => {
    const { petId } = userPetAction;
    try {
      setShowSpinner(true);
      const res = await instance.post(
        `${petsRoute}/adopt/${petId}`,
        userPetAction
      );
      setShowSpinner(false);
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  const returnPet = async (petId) => {
    try {
      setShowSpinner(false);
      const res = await instance.post(`${petsRoute}/return/${petId}`, petId);
      setShowSpinner(false);
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  const getAllPets = async () => {
    try {
      setShowSpinner(true);
      const res = await instance.get(`${petsRoute}`);
      if (res.data) {
        setShowSpinner(false);
        setPetsList(res.data);
      }
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  const updatePet = async (userId, petId, petData) => {
    try {
      setShowSpinner(true);
      const res = await instance.put(`${petsRoute}/${userId}/${petId}`, petData);
      if (res.data) {
        setShowSpinner(false);
        setUpdatedPet(true);
        setTimeout(()=> {
          window.location.reload();
         }, 3000);
      }
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  return (
    <PetsContext.Provider
      value={{
        addedPet,
        addNewPet,
        fetchPets,
        petsList,
        getPet,
        pet,
        savePet,
        removePet,
        adoptOrFoster,
        returnPet,
        getAllPets,
        updatePet,
        updatedPet,
        showSpinner,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
