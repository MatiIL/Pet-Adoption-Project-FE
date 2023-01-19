import { createContext, useContext, useState } from "react";
import axios from "axios";

export const PetsContext = createContext(true);

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {
  const petsRoute = "http://localhost:8080/pets";
  const [response, setResponse] = useState(false);
  const [petsList, setPetsList] = useState([]);
  const [pet, setPet] = useState({});
  const [userPetsList, setUserPetsList] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);

  const addNewPet = async (petData) => {
    try {
      setShowSpinner(true);
      const res = await axios.post(petsRoute, petData);
      if (res.data) {
        setShowSpinner(false);
        setResponse(true);
      }
    } catch (error) {
      setShowSpinner(false);
      console.log(error);
    }
  };

  const fetchPets = async (userInput) => {
    try {
      setShowSpinner(true);
      const res = await axios.get(`${petsRoute}/search`, { params: userInput });
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
      const res = await axios.get(`${petsRoute}/${petId}`);
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
      const res = await axios.post(`${petsRoute}/${petId}/save`, petId);
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
      const res = await axios.delete(`${petsRoute}/${petId}/remove`);
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
      const res = await axios.post(
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
      const res = await axios.post(`${petsRoute}/return/${petId}`, petId);
      setShowSpinner(false);
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  const getUserPets = async (userId) => {
    try {
      setShowSpinner(true);
      const res = await axios.get(`${petsRoute}/mypets/${userId}`);
      if (res.data) {
        setShowSpinner(false);
        setUserPetsList(res.data);
      } 
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  const getAllPets = async () => {
    try {
      setShowSpinner(true);
      const res = await axios.get(`${petsRoute}`);
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
      const res = await axios.put(`${petsRoute}/${userId}/${petId}`, petData);
      if (res.data) {
        setShowSpinner(false);
        window.location.reload();
      }
    } catch (err) {
      setShowSpinner(false);
      console.log(err);
    }
  };

  return (
    <PetsContext.Provider
      value={{
        response,
        addNewPet,
        fetchPets,
        petsList,
        getPet,
        pet,
        savePet,
        removePet,
        adoptOrFoster,
        returnPet,
        getUserPets,
        userPetsList,
        getAllPets,
        updatePet,
        showSpinner,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
