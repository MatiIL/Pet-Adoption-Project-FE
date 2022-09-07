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

  const addNewPet = async (petData) => {
    try {
      const res = await axios.post(petsRoute, petData, {
        withCredentials: true,
      });
      if (res.data) {
        console.log(res.data);
        setResponse(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPets = async (userInput) => {
    try {
      const res = await axios.get(`${petsRoute}/search`, { params: userInput });
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

  const savePet = async (petId) => {
    try {
      const res = await axios.post(`${petsRoute}/${petId}/save`, petId, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
      console.log("this will be replaced by err message at the UI");
    }
  };

  const removePet = async (petId) => {
    try {
      const res = await axios.delete(`${petsRoute}/${petId}/remove`, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const adoptOrFoster = async (userPetAction) => {
    const { petId } = userPetAction;
    try {
      const res = await axios.post(
        `${petsRoute}/adopt/${petId}`,
        userPetAction,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const returnPet = async (petId) => {
    try {
      const res = await axios.post(`${petsRoute}/return/${petId}`, petId, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getUserPets = async (userId) => {
    try {
      const res = await axios.get(`${petsRoute}/mypets/${userId}`, {
        withCredentials: true,
      });
      if (res.data) setUserPetsList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPets = async () => {
    try {
      const res = await axios.get(`${petsRoute}`, { withCredentials: true });
      if (res.data) {
        setPetsList(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updatePet = async (userId, petId, petData) => {
    try {
      const res = await axios.put(`${petsRoute}/${userId}/${petId}`, petData, {
        withCredentials: true,
      });
      if (res.data) {
        window.location.reload();
      }
    } catch (err) {
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
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
