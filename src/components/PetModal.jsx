import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { usePetsContext } from "../context/PetsContext";

function PetModal() {
  const { addNewPet, response } = usePetsContext();
  const [lgShow, setLgShow] = useState(false);
  const [type, setType] = useState("");
  const [petName, setPetName] = useState("");
  const [status, setStatus] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [petImage, setPetImage] = useState();
  const [diet, setDiet] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [isHypo, setIsHypo] = useState(false);
  const [petBio, setPetBio] = useState("");

  const handleClose = () => {
    setLgShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPet = {
      type: type,
      name: petName,
      adoptionStatus: status,
      height: height,
      weight: weight,
      dietary: diet,
      breed: breed,
      color: color,
      hypoallergenic: isHypo,
      bio: petBio,
    };
    const petData = new FormData();
    for (let key in newPet) {
      petData.append(key, newPet[key]);
    }
    petData.append("picture", petImage);
    try {
      addNewPet(petData);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant="outline-secondary" onClick={() => setLgShow(true)}>
        Add New Pet
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add a New Pet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex justify-content-around">
            <div className="search-details d-flex flex-column w-25">
              <Form.Select
                aria-label="pet's type"
                className="me-2 mb-3"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>Type</option>
                <option value="1">Cat</option>
                <option value="2">Dog</option>
              </Form.Select>

              <FloatingLabel
                controlId="floatingInput"
                label="Pet's Name:"
                className=""
              >
                <Form.Control
                  className=""
                  type="text"
                  placeholder="Name"
                  style={{ height: "80px" }}
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
              </FloatingLabel>

              <Form.Select
                aria-label="pet's status"
                className="mt-3 mb-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Status</option>
                <option value="1">Available</option>
                <option value="2">Fostered</option>
                <option value="3">Adopted</option>
              </Form.Select>
              <div className="height-and-weight d-flex">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Height:"
                  className="mb-3 me-2"
                >
                  <Form.Control
                    type="number"
                    placeholder="Height"
                    style={{ minWidth: "75px", maxHeight: "50px" }}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Weight:"
                  className="mb-3 ms-2"
                >
                  <Form.Control
                    type="number"
                    placeholder="Weight"
                    style={{ minWidth: "75px", maxHeight: "50px" }}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </FloatingLabel>
              </div>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Picture:</Form.Label>
                <Form.Control
                  type="file"
                  size="sm"
                  onChange={(e) => setPetImage(e.target.files[0])}
                  accept="image/*"
                />
              </Form.Group>
            </div>
            <div className="page-details w-50">
              <FloatingLabel
                controlId="floatingTextarea"
                label="Dietary Restrictions:"
                className="mb-3"
              >
                <Form.Control
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  as="textarea"
                  placeholder="Dietary Restrictions"
                />
              </FloatingLabel>
              <div className="color-breed-hypo d-flex">
                <div className="breed-color d-flex">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Breed:"
                    className="mb-3"
                  >
                    <Form.Control
                      className=" me-3"
                      type="text"
                      placeholder="Breed"
                      style={{ minWidth: "55px" }}
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Color:"
                    className="mb-2"
                  >
                    <Form.Control
                      className="pet-form-color ms-2"
                      type="text"
                      placeholder="Color"
                      style={{ minWidth: "35px" }}
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </FloatingLabel>
                </div>
                <div className="hypo d-flex flex-column ms-4">
                  <Form.Label>Hypoallergenic?</Form.Label>
                  <Form.Select
                    aria-label="Hypoallergenic"
                    className="hypo"
                    value={isHypo}
                    onChange={(e) => setIsHypo(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Form.Select>
                </div>
              </div>

              <FloatingLabel
                controlId="floatingTextarea2"
                label="Pet's Bio:"
                className="petform-bio mt-3"
              >
                <Form.Control
                  value={petBio}
                  onChange={(e) => setPetBio(e.target.value)}
                  as="textarea"
                  placeholder="Pet's Bio"
                  style={{ height: "110px" }}
                />
              </FloatingLabel>
              <Button
                className="position-absolute bottom-0 end-0 me-2 mb-2"
                onClick={handleSubmit}
              >
                Add Pet
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PetModal;
