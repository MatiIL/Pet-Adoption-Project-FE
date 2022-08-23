import SearchForm from '../components/SearchForm'
import PetsContextProvider from '../context/PetsContext';

function FindPet() {
    return (
        <PetsContextProvider>
        <div className="search-container ms-3">
            {/* <h2 className=" mt-4 ms-2">Pet Search</h2> */}
            <SearchForm/>
        </div>
        </PetsContextProvider>
    )
}

export default FindPet;