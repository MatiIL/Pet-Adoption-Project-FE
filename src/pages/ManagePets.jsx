import { useAuthContext } from "../context/AuthContext"
import { usePetsContext } from "../context/PetsContext"
import { useEffect } from "react"
import SearchPetResults from "../components/SearchPetResults"

function ManagePets() {
    const { petsList, getAllPets } = usePetsContext();
    const { isAdmin } = useAuthContext();

    useEffect(() => {
        if (isAdmin)
        getAllPets();
      }, [isAdmin]);

      return (
        <div className="pets-wrapper d-flex justify-content-center bg-light">
            <div className="pets-list d-flex flex-column justify-content-center">
        <h3 className="mt-3">Review All Pets</h3>
        <SearchPetResults petsList={petsList}/>
      </div>
        </div>
      )
}

export default ManagePets;