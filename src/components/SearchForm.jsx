import { usePetsContext } from "../context/PetsContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SearchPetResults from "./SearchPetResults";
import { useState, useEffect } from "react";

function SearchForm() {
  const { fetchPets, petsList } = usePetsContext();
  const [isChecked, setIsChecked] = useState(false);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [minHeight, setMinHeight] = useState("");
  const [maxHeight, setMaxHeight] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleBtn = () => {
    setIsChecked(!isChecked);
  };

  const searchPets = async () => {
    setIsLoading(true);
    const searchParams = {
      type: type,
      status: status,
      name: name,
      minHeight: minHeight,
      maxHeight: maxHeight,
      minWeight: minWeight,
      maxWeight: maxWeight,
    }
    try {
      fetchPets(searchParams);
    }
    catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="wrapper">
      <div className="search-bar d-flex flex-column justify-content-center mt-2">
        <div className="d-flex flex-row-reverse mt-2 mb-2 mx-auto">
          <label className="">Advanced Search</label>
          <Form.Check
            className="align-self-start mx-2"
            id="search-type"
            type="checkbox"
            onChange={toggleBtn}
          />
        </div>
        <div className="d-flex justify-content-between mx-auto">
          <Form.Select
            aria-label="pet's type"
            className="me-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Type</option>
            <option value="1">Cat</option>
            <option value="2">Dog</option>
          </Form.Select>
          <Button id="search-btn" onClick={searchPets} className="">
            Search
          </Button>
        </div>
        <div className={isChecked ? "d-block" : "d-none"}>
          <div className="d-flex flex-wrap justify-content-around">
            <Form.Select
              aria-label="pet's status"
              className="advnc-srch mt-3 mb-3"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Status</option>
              <option value="1">Available</option>
              <option value="2">Fostered</option>
              <option value="3">Adopted</option>
            </Form.Select>
            <Form.Control
              className="advnc-srch mt-3 mb-3"
              type="text"
              placeholder="Name"
              value={name} onChange={(e) => setName(e.target.value)}
            />
            <Form.Control
              className="height-and-weight mt-3 mb-3"
              type="text"
              placeholder="Min Height (cm)"
              value={minHeight} onChange={(e) => setMinHeight(e.target.value)}
            /> 
            <Form.Control
              className="height-and-weight mt-3 mb-3"
              type="text"
              placeholder="Max Height (cm)"
              value={maxHeight} onChange={(e) => setMaxHeight(e.target.value)}
            /> 
           
             <Form.Control
              className="height-and-weight mt-3 mb-3"
              type="text"
              placeholder="Min Weight (kg)" 
              value={minWeight} onChange={(e) => setMinWeight(e.target.value)}
            />
            <Form.Control
              className="height-and-weight mt-3 mb-3"
              type="text"
              placeholder="Max Weight (kg)" 
              value={maxWeight} onChange={(e) => setMaxWeight(e.target.value)}
            />
          </div>
        </div>
      </div>

      <SearchPetResults petsList={petsList} />
    </div>
  );
}

export default SearchForm;
