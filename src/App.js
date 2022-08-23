import AuthContextProvider from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FindPet from "./pages/FindPet";
import PetPage from "./pages/PetPage";
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
    <div className="App">
      <BrowserRouter>
      <NavBar fixed="top"/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/FindPet" element={<FindPet/>} />
          <Route path="/PetPage" element={<PetPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
    </AuthContextProvider>
  );
}

export default App;
