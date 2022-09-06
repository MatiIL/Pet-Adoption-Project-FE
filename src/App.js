import { useAuthContext } from "./context/AuthContext"
import PetsContextProvider from "./context/PetsContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import HomePage from "./pages/HomePage"
import FindPet from "./pages/FindPet"
import PetPage from "./pages/PetPage"
import MyPets from "./pages/MyPets"
import MyProfile from "./pages/MyProfile"
import NavBar from './components/NavBar'
import './App.css'
import UsersPage from "./pages/UsersPage"
import ManagePets from "./pages/ManagePets"

function App() {
  const { currentUserAuth } = useAuthContext();
 
  
  return (
    <PetsContextProvider>
    <div className="App">
      <BrowserRouter>
      <NavBar fixed="top"/>
        <Routes>
          <Route exact path="/UsersPage" element={<UsersPage/>} />
          <Route exact path="ManagePets" element={<ManagePets/>} />
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/FindPet" element={<FindPet/>} />
          <Route exact path="/PetPage/:petId" element={<PetPage/>} />
          <Route exact path="/MyPets" element={<PrivateRoute>
          <MyPets/>
          </PrivateRoute>} />
          <Route  exact path="/MyProfile" element={<PrivateRoute>
          <MyProfile/>
          </PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
    </PetsContextProvider>
  );
}

export default App;
