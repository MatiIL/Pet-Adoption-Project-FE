import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function PetModal() {
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <Button variant="outline-secondary" onClick={() => setLgShow(true)}>
        Add New Pet
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
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
              <Form.Select aria-label="pet's type" className="me-2 mb-3">
                <option>Type</option>
                <option value="1">Cat</option>
                <option value="2">Dog</option>
              </Form.Select>
              
              <FloatingLabel
                controlId="floatingInput"
                label="Pet's Name:"
                className=""
              >
                <Form.Control className="" type="text" placeholder="Name" />
              </FloatingLabel>
              
              <Form.Select aria-label="pet's status" className="mt-3 mb-3">
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
                <Form.Control className="" type="text" placeholder="Height" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Weight:"
                className="mb-3 ms-2"
              >
                <Form.Control className="" type="text" placeholder="Weight" />
              </FloatingLabel>
              </div>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Picture:</Form.Label>
                <Form.Control type="file" size="sm" />
              </Form.Group>
            </div>
            <div className="page-details w-50">
            <FloatingLabel
                controlId="floatingTextarea"
                label="Dietary Restrictions:"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Dietary Restrictions"
                />
              </FloatingLabel>
              <div className="color-breed-hypo d-flex">
              <FloatingLabel
                controlId="floatingInput"
                label="Breed:"
                className="mb-3"
              >
                <Form.Control className="mt-3 me-3" type="text" placeholder="Breed" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Color:"
                className="mb-2"
              >
                <Form.Control className="mt-3 ms-2" type="text" placeholder="Color" />
              </FloatingLabel>
              <div className="hypo d-flex flex-column ms-4">
              <Form.Label>Hypoallergenic?</Form.Label>
              <Form.Select aria-label="Hypoallergenic" className="mb-2">
                <option>No</option>
                <option value="1">Yes</option>
              </Form.Select>
              </div>
              </div>
              <FloatingLabel controlId="floatingTextarea2" label="Pet's Bio:" className="mt-3">
                <Form.Control
                className=""
                  as="textarea"
                  placeholder="Pet's Bio"
                  style={{ height: "110px" }}
                />
              </FloatingLabel>
              <Button className="position-absolute bottom-0 end-0 me-2 mb-2">Add Pet</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PetModal;
