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
import AdminRoutes from "./routes/AdminRoutes"
import UserRoutes from "./routes/UserRoutes"

function App() {
  return (
    <AuthContextProvider>
      <PetsContextProvider>
        <div className="App">
          <BrowserRouter>
            <NavBar fixed="top" />
            <Routes>
              <Route
                exact
                path="/UsersPage"
                element={
                  <AdminRoutes >
                    <UsersPage />
                  </AdminRoutes>
                }
              />
              <Route
                exact
                path="ManagePets"
                element={
                  <AdminRoutes >
                    <ManagePets />
                  </AdminRoutes>
                }
              />
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/FindPet" element={<FindPet />} />
              <Route exact path="/PetPage/:petId" element={<PetPage />} />
              <Route
                exact
                path="/MyPets"
                element={
                  <UserRoutes >
                    <MyPets />
                  </UserRoutes>
                }
              />
              <Route
                exact
                path="/MyProfile"
                element={
                  <UserRoutes >
                    <MyProfile />
                  </UserRoutes>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </PetsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
