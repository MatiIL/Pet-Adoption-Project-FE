import { useAuthContext } from "../context/AuthContext"
import { usePetsContext } from "../context/PetsContext"
import { useEffect, useState } from "react"
import SearchPetResults from "../components/SearchPetResults"
// import { Stack, Container, Row, Col, Button, Modal } from "react-bootstrap"

function ManagePets() {
    const { petsList, getAllPets } = usePetsContext();
    const { isAdmin } = useAuthContext();

    useEffect(() => {
        if (isAdmin)
        getAllPets();
      }, [isAdmin]);

      return (
        <div className="pets-wrapper d-flex justify-content-center mt-4">
            <div className="pets-list d-flex flex-column justify-content-center">
        <h3>All Pets</h3>
        <SearchPetResults petsList={petsList}/>
      </div>
        </div>
      )
}

export default ManagePets;