import { createContext, useContext, useState } from "react";
import axios from 'axios';

export const PetsContext = createContext(true);

export function usePetsContext() {
    return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {
    const serverURL = "http://localhost:8080/pets";
    const [petsList, setPetsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPets = async() => {
        try {
        setIsLoading(true);
        const res = await axios.get(serverURL);
        console.log(res);
        setPetsList(res.data);
        }
        catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return <PetsContext.Provider value={{ fetchPets, petsList, isLoading }}>
        {children}
    </PetsContext.Provider>
}

