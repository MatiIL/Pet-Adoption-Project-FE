import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SearchPetResults from "./SearchPetResults";

import { useState } from "react";
import axios from "axios";

function SearchForm() {
  const [petsList, setPetsList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const toggleBtn = () => {
    setIsChecked(!isChecked);
  };

  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/pets");
      const allPets = res.data;

      setPetsList(allPets);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Form.Select aria-label="pet's type" className="me-2">
            <option>Type</option>
            <option value="1">Cat</option>
            <option value="2">Dog</option>
          </Form.Select>
          <Button id="search-btn" onClick={fetchPets} className="ms-2">
            Search
          </Button>
        </div>
        <div className={isChecked ? "d-block" : "d-none"}>
          <div className="d-flex flex-wrap justify-content-center">
            <Form.Select aria-label="pet's status" className="advnc-srch m-3">
              <option>Status</option>
              <option value="1">Available</option>
              <option value="2">Fostered</option>
              <option value="3">Adopted</option>
            </Form.Select>
            <Form.Control
              className="advnc-srch m-3"
              type="text"
              placeholder="Name"
            />
            <Form.Control
              className="advnc-srch m-3"
              type="text"
              placeholder="Height"
            />
            <Form.Control
              className="advnc-srch m-3"
              type="text"
              placeholder="Weight"
            />
          </div>
        </div>
      </div>

      <SearchPetResults petsList={petsList} />
    </div>
  );
}

export default SearchForm;
