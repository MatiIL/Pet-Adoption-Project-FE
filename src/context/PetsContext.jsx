import { createContext, useContext, useState } from "react"
import instance from "./AxiosContext"

export const PetsContext = createContext(true);

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {
  const [savedPet, setSavedPet] = useState(false);
  const [removedPet, setRemovedPet] = useState(false);
  const [addedPet, setAddedPet] = useState(false);
  const [returnedPet, setReturnedPet] = useState(false);
  const [updatedPet, setUpdatedPet] = useState(false);
  const [petsList, setPetsList] = useState([]);
  const [pet, setPet] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);

  const addNewPet = async (petData) => {
    try {
      setShowSpinner(true);
      const res = await instance.post('/pets/add-pet', petData);
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
      const res = await instance.get(`/pets/search`, { params: userInput });
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
      const res = await instance.get(`/pets/pet/${petId}`);
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
      const res = await instance.put(`/pets/pet/${petId}/save`, petId);
      if (res.data.ok) {
        setShowSpinner(false);
        setSavedPet(true);
      } else {
        setShowSpinner(false);
        setSavedPet(false);
      } 
    } catch (err) {
      setShowSpinner(false);
      console.error(err);
      setSavedPet(false);
    }
  };

  const removePet = async (petId) => {
    try {
      setShowSpinner(true);
      const res = await instance.delete(`/pets/pet/${petId}/remove`);
      if (res.data.ok) {
        setShowSpinner(false);
        setRemovedPet(true);
      } else {
        setShowSpinner(false);
        setRemovedPet(false);
      }
    } catch (err) {
      setShowSpinner(false);
      setRemovedPet(false);
      console.log(err);
    }
  };

  const adoptOrFoster = async (userPetAction) => {
    const { petId, action } = userPetAction;
    try {
      setShowSpinner(true);
      const res = await instance.put(
        `/pets/pet/adopt/${petId}`,
        userPetAction
      );
      if (res.data.ok) setShowSpinner(false);
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  const returnPet = async (petId) => {
    try {
      setShowSpinner(true);
      const res = await instance.put(`/pets/pet/return/${petId}`, petId);
      if (res.data.ok) {
        setReturnedPet(true);

      } setShowSpinner(false);
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  const getAllPets = async () => {
    try {
      setShowSpinner(true);
      const res = await instance.get(`/pets/all-pets`);
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
      const res = await instance.put(`/pets/${userId}/${petId}`, petData);
      if (res.data) {
        setShowSpinner(false);
        setUpdatedPet(true);
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
        savedPet,
        removePet,
        removedPet,
        adoptOrFoster,
        returnPet,
        returnedPet,
        getAllPets,
        updatePet,
        updatedPet,
        setUpdatedPet,
        showSpinner,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
