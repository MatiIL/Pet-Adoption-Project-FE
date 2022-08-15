import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPet from "./pages/SearchPet";
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar fixed="top"/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/SearchPet" element={<SearchPet/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
