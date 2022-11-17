import PetsContextProvider from "./context/PetsContext"
import AuthContextProvider from "./context/AuthContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import FindPet from "./pages/FindPet"
import PetPage from "./pages/PetPage"
import MyPets from "./pages/MyPets"
import MyProfile from "./pages/MyProfile"
import NavBar from "./components/NavBar"
import "./App.css"
import UsersPage from "./pages/UsersPage"
import ManagePets from "./pages/ManagePets"

function App() {

  return (
    <PetsContextProvider>
      <AuthContextProvider>
      <div className="App">
        <BrowserRouter>
          <NavBar fixed="top" />
          <Routes>
            <Route
              exact
              path="/UsersPage"
              element={<UsersPage/>}
            />
            <Route
              exact
              path="ManagePets"
              element={<ManagePets />}
            />
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/FindPet" element={<FindPet />} />
            <Route exact path="/PetPage/:petId" element={<PetPage />} />
            <Route
              exact
              path="/MyPets"
              element={<MyPets />}
            />
            <Route
              exact
              path="/MyProfile"
              element={<MyProfile />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      </AuthContextProvider>
    </PetsContextProvider>
  );
}

export default App;
