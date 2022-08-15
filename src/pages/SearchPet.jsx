import SearchForm from '../components/SearchForm'
import PetsList from "../components/PetsList";


function SearchPet() {
    return (
        <div className="search-container d-flex flex-column align-items-start ms-3">
            <h2 className=" mt-4 ms-2">Search for a Pet</h2>
            <SearchForm/>
            <PetsList/>
        </div>

    )
}

export default SearchPet;