import AuthContextProvider from "./context/AuthContext";
import PetsContextProvider from "./context/PetsContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FindPet from "./pages/FindPet";
import PetPage from "./pages/PetPage";
import MyPets from "./pages/MyPets";
import MyProfile from "./pages/MyProfile";
import NavBar from './components/NavBar';
import './App.css';

function App() {

  return (
    <PetsContextProvider>
    <AuthContextProvider>
    <div className="App">
      <BrowserRouter>
      <NavBar fixed="top"/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/FindPet" element={<FindPet/>} />
          <Route path="/PetPage/:petId" element={<PetPage/>} />
          <Route path="/MyPets" element={<MyPets/>} />
          <Route path="/MyProfile" element={<MyProfile/>} />
        </Routes>
      </BrowserRouter>
    </div>
    </AuthContextProvider>
    </PetsContextProvider>
  );
}

export default App;
