import SearchForm from '../components/SearchForm'
import PetsContextProvider from '../context/PetsContext';

function FindPet() {
    return (
        <PetsContextProvider>
        <div className="search-container ms-3">
            <SearchForm/>
        </div>
        </PetsContextProvider>
    )
}

export default FindPet;