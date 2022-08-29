import { createContext, useContext, useState } from "react";
import axios from 'axios';

export const PetsContext = createContext(true);

export function usePetsContext() {
    return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {
    const petsRoute = "http://localhost:8080/pets";
    const [petsList, setPetsList] = useState([]);
    

    const fetchPets = async (userInput) => {
        try {
          const res = await axios.get(`${petsRoute}/search`, { params: userInput }, {withCredentials: true});
          const petSearch = res.data;
          // console.log(petSearch);
          setPetsList(petSearch);
        } catch (error) {
          console.log(error);
        }
      };

    return <PetsContext.Provider value={{ fetchPets, petsList }}>
        {children}
    </PetsContext.Provider>
}

