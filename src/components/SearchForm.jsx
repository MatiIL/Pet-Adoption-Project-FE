import { usePetsContext } from "../context/PetsContext"
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap"
import SearchPetResults from "./SearchPetResults"
import { useState, useEffect } from "react"

function SearchForm() {
  const { fetchPets, petsList, showSpinner } = usePetsContext();
  const [isChecked, setIsChecked] = useState(false);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = {
    type: type,
    status: status,
    name: name,
    minHeight: minHeight,
    maxHeight: maxHeight,
    minWeight: minWeight,
    maxWeight: maxWeight,
  };

  const searchPets = async () => {
    setIsLoading(true);
    try {
      fetchPets(searchParams);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    searchPets();
  }, []);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
    setStatus("");
    setName("");
    setMinHeight(0);
    setMaxHeight(0);
    setMinWeight(0);
    setMaxWeight(0);
  };

  return (
    <div className="wrapper bg-light">
      <div className="search-bar d-flex flex-column justify-content-center mt-2">
        <div className="d-flex flex-row-reverse mt-2 mb-2 mx-auto">
          <label className="">Advanced Search</label>
          <Form.Check
            className="align-self-start mx-2"
            id="search-type"
            type="checkbox"
            onChange={toggleCheck}
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

          <Button
            variant="outline-secondary"
            id="search-btn"
            onClick={searchPets}
            className="d-flex"
          >
            {showSpinner ? (
              <Spinner
                className="mt-1 me-2"
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              ""
            )}
            <span>Search</span>
          </Button>
        </div>
        <div className={isChecked ? "d-block" : "d-none"}>
          <div className="d-flex flex-wrap align-items-center mt-2">
            <div className="status-name d-flex justify-content-evenly">
              <Form.Select
                aria-label="pet's status"
                className="advnc-srch pet-status mt-3 mb-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Status</option>
                <option value="1">Available</option>
                <option value="2">Fostered</option>
                <option value="3">Adopted</option>
              </Form.Select>
              <Form.Control
                className="advnc-srch pet-name mt-3 mb-3"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="h-and-w d-flex flex-wrap">
              <div className="heights d-flex">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Min Height (cm)"
                >
                  <Form.Control
                    className="height-and-weight m-2"
                    type="number"
                    value={minHeight}
                    onChange={(e) => setMinHeight(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Max Height (cm)"
                >
                  <Form.Control
                    className="height-and-weight m-2"
                    type="number"
                    value={maxHeight}
                    onChange={(e) => setMaxHeight(e.target.value)}
                  />
                </FloatingLabel>
              </div>
              <div className="weights d-flex">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Min Weight (kg)"
                >
                  <Form.Control
                    className="height-and-weight m-2"
                    type="number"
                    value={minWeight}
                    onChange={(e) => setMinWeight(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Max Weight (kg)"
                >
                  <Form.Control
                    className="height-and-weight m-2"
                    type="number"
                    value={maxWeight}
                    onChange={(e) => setMaxWeight(e.target.value)}
                  />
                </FloatingLabel>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SearchPetResults petsList={petsList} searchPets={searchPets}/>
    </div>
  );
}

export default SearchForm;
