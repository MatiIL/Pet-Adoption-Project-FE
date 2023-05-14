import { usePetsContext } from "../context/PetsContext";
import { useAuthContext } from "../context/AuthContext";
import { capFirstLetters } from "../Utils";
import React, { useState, useEffect } from "react";
import { Form, FloatingLabel, Button, Spinner } from "react-bootstrap";
import { Tooltip } from "react-tooltip";

function PetForm(props) {
  const { pet, handleClose } = props;
  const { addNewPet, updatePet, showSpinner } = usePetsContext();
  const { isAdmin, loggedUser } = useAuthContext();
  const { userId } = loggedUser;
  const [type, setType] = useState("");
  const [petName, setPetName] = useState("");
  const [status, setStatus] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [petImage, setPetImage] = useState();
  const [diet, setDiet] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [isHypo, setIsHypo] = useState("");
  const [petBio, setPetBio] = useState("");

  const [validInputs, setValidInputs] = useState({
    validType: false,
    validName: false,
    validStatus: false,
    validHeight: false,
    validWeight: false,
    validImage: false,
    validDiet: false,
    validBreed: false,
    validColor: false,
    validIsHypo: false,
    validBio: false,
  });

  const [invalidInputs, setInvalidInputs] = useState({
    invalidType: false,
    invalidName: false,
    invalidStatus: false,
    invalidHeight: false,
    invalidWeight: false,
    invalidImage: false,
    invalidDiet: false,
    invalidBreed: false,
    invalidColor: false,
    invalidIsHypo: false,
    invalidBio: false,
  });

  const handleFormChange = (e) => {
    switch (e.target.name) {
      case "pet-type":
        setType(e.target.value);
        if (e.target.value === "1" || e.target.value === "2") {
          setInvalidInputs({ ...invalidInputs, invalidType: false });
          setValidInputs({ ...validInputs, validType: true });
        } else {
          setValidInputs({ ...validInputs, validType: false });
          setInvalidInputs({ ...invalidInputs, invalidType: true });
        }
        break;
      case "pet-name":
        const styledName = capFirstLetters(e.target.value);
        setPetName(styledName);
        if (e.target.value.length > 1) {
          setInvalidInputs({ ...invalidInputs, invalidName: false });
          setValidInputs({ ...validInputs, validName: true });
        } else {
          setValidInputs({ ...validInputs, validName: false });
          setInvalidInputs({ ...invalidInputs, invalidName: true });
        }
        break;
      case "pet-status":
        setStatus(e.target.value);
        if (e.target.value !== "Status") {
          setInvalidInputs({ ...invalidInputs, invalidStatus: false });
          setValidInputs({ ...validInputs, validStatus: true });
        } else {
          setValidInputs({ ...validInputs, validStatus: false });
          setInvalidInputs({ ...invalidInputs, invalidStatus: true });
        }
        break;
      case "pet-height":
        setHeight(e.target.value);
        if (e.target.value > 0 && e.target.value < 111) {
          setInvalidInputs({ ...invalidInputs, invalidHeight: false });
          setValidInputs({ ...validInputs, validHeight: true });
        } else {
          setValidInputs({ ...validInputs, validHeight: false });
          setInvalidInputs({ ...invalidInputs, invalidHeight: true });
        }
        break;
      case "pet-weight":
        setWeight(e.target.value);
        if (e.target.value > 0 && e.target.value < 128) {
          setInvalidInputs({ ...invalidInputs, invalidWeight: false });
          setValidInputs({ ...validInputs, validWeight: true });
        } else {
          setValidInputs({ ...validInputs, validWeight: false });
          setInvalidInputs({ ...invalidInputs, invalidWeight: true });
        }
        break;
      case "pet-pic":
        setPetImage(e.target.files[0]);
        setInvalidInputs({ ...invalidInputs, invalidImage: false });
        setValidInputs({ ...validInputs, validImage: true });
        break;
      case "pet-diet":
        setDiet(e.target.value);
        if (e.target.value.length > 2) {
          setInvalidInputs({ ...invalidInputs, invalidDiet: false });
          setValidInputs({ ...validInputs, validDiet: true });
        } else {
          setValidInputs({ ...validInputs, validDiet: false });
          setInvalidInputs({ ...invalidInputs, invalidDiet: true });
        }
        break;
      case "pet-breed":
        const styledBreed = capFirstLetters(e.target.value);
        setBreed(styledBreed);
        if (e.target.value.length > 3) {
          setInvalidInputs({ ...invalidInputs, invalidBreed: false });
          setValidInputs({ ...validInputs, validBreed: true });
        } else {
          setValidInputs({ ...validInputs, validBreed: false });
          setInvalidInputs({ ...invalidInputs, invalidBreed: true });
        }
        break;
      case "pet-color":
        setColor(e.target.value);
        if (e.target.value.length > 2) {
          setInvalidInputs({ ...invalidInputs, invalidColor: false });
          setValidInputs({ ...validInputs, validColor: true });
        } else {
          setValidInputs({ ...validInputs, validColor: false });
          setInvalidInputs({ ...invalidInputs, invalidColor: true });
        }
        break;
      case "pet-hypo":
        setIsHypo(e.target.value);
        if (e.target.value === "1" || e.target.value === "2") {
          setInvalidInputs({ ...invalidInputs, invalidIsHypo: false });
          setValidInputs({ ...validInputs, validIsHypo: true });
        } else {
          setValidInputs({ ...validInputs, validIsHypo: false });
          setInvalidInputs({ ...invalidInputs, invalidIsHypo: true });
        }
        break;
      case "pet-bio":
        setPetBio(e.target.value);
        if (e.target.value.length > 9) {
          setInvalidInputs({ ...invalidInputs, invalidBio: false });
          setValidInputs({ ...validInputs, validBio: true });
        } else {
          setValidInputs({ ...validInputs, validBio: false });
          setInvalidInputs({ ...invalidInputs, invalidBio: true });
        }
        break;
    }
  };

  useEffect(() => {
      if (pet) {
        setType(pet.type);
        setPetName(pet.name);
        setStatus(pet.adoptionStatus);
        setHeight(pet.height);
        setWeight(pet.weight);
        setDiet(pet.dietary);
        setBreed(pet.breed);
        setColor(pet.color);
        setIsHypo(pet.hypoallergenic);
        setPetBio(pet.bio);
      }
  }, [pet]);

  const handleUndefined = () => {
    if (petImage === undefined)
      setInvalidInputs({ ...invalidInputs, invalidImage: true });
    if (petBio === undefined)
      setInvalidInputs({ ...invalidInputs, invalidBio: true });
    if (color === undefined)
      setInvalidInputs({ ...invalidInputs, invalidColor: true });
    if (breed === undefined)
      setInvalidInputs({ ...invalidInputs, invalidBreed: true });
    if (diet === undefined)
      setInvalidInputs({ ...invalidInputs, invalidDiet: true });
    if (isHypo === undefined)
      setInvalidInputs({ ...invalidInputs, invalidIsHypo: true });
    if (weight === undefined)
      setInvalidInputs({ ...invalidInputs, invalidWeight: true });
    if (height === undefined)
      setInvalidInputs({ ...invalidInputs, invalidHeight: true });
    if (status === undefined)
      setInvalidInputs({ ...invalidInputs, invalidStatus: true });
    if (petName === undefined)
      setInvalidInputs({ ...invalidInputs, invalidName: true });
    if (type === undefined)
      setInvalidInputs({ ...invalidInputs, invalidType: true });
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
    const inputsArray = Object.values(newPet);
    if (inputsArray.includes(undefined) || petImage === undefined) {
      handleUndefined();
      return;
    }
    const petData = new FormData();
    for (let key in newPet) {
      petData.append(key, newPet[key]);
    }
    petData.append("picture", petImage);
    try {
      await addNewPet(petData);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const editedPet = {
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
    const inputsArray = Object.values(editedPet);
    if (inputsArray.includes(undefined) || petImage === undefined) {
      handleUndefined();
      return;
    }
    const petData = new FormData();
    for (let key in editedPet) {
      petData.append(key, editedPet[key]);
    }
    petData.append("picture", petImage);

    try {
      await updatePet(userId, pet._id, petData);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="add-pet-form d-flex justify-content-around" noValidate>
      <div className="add-pet-details d-flex flex-column w-25">
        <Form.Select
          name="pet-type"
          aria-label="pet's type"
          className="add-pet-type me-2 mb-3"
          value={type || ""}
          onChange={(e) => handleFormChange(e)}
          isInvalid={invalidInputs.invalidType}
          isValid={validInputs.validType}
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
            name="pet-name"
            required={true}
            className="add-pet-name"
            type="text"
            placeholder="Name"
            style={{ height: "80px" }}
            value={petName || ""}
            onChange={(e) => handleFormChange(e)}
            isInvalid={invalidInputs.invalidName}
            isValid={validInputs.validName}
          />
        </FloatingLabel>

        <Form.Select
          name="pet-status"
          aria-label="pet's status"
          className="add-pet-status mt-3 mb-3"
          value={status || ""}
          onChange={(e) => handleFormChange(e)}
          isValid={validInputs.validStatus}
          isInvalid={invalidInputs.invalidStatus}
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
              name="pet-height"
              type="number"
              placeholder="Height"
              style={{ minWidth: "88px", maxHeight: "50px" }}
              value={height || 0}
              onChange={(e) => handleFormChange(e)}
              isValid={validInputs.validHeight}
              isInvalid={invalidInputs.invalidHeight}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Weight:"
            className="mb-3 ms-2"
          >
            <Form.Control
              name="pet-weight"
              type="number"
              placeholder="Weight"
              style={{ minWidth: "88px", maxHeight: "50px" }}
              value={weight || 0}
              onChange={(e) => handleFormChange(e)}
              isValid={validInputs.validWeight}
              isInvalid={invalidInputs.invalidWeight}
            />
          </FloatingLabel>
        </div>
        <div className="add-pet-hypo d-flex flex-column mt-2">
          <Form.Select
            name="pet-hypo"
            aria-label="Hypoallergenic"
            className="hypo"
            value={isHypo || false}
            onChange={(e) => handleFormChange(e)}
            isValid={validInputs.validIsHypo}
            isInvalid={invalidInputs.invalidIsHypo}
          >
            <option>Hypoallergenic?</option>
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </div>
      </div>
      <div className="pet-details-right w-50">
        <FloatingLabel
          controlId="floatingTextarea"
          label="Dietary Restrictions:"
          className="add-pet-diet mb-2"
        >
          <Form.Control
            name="pet-diet"
            value={diet}
            onChange={(e) => handleFormChange(e)}
            isValid={validInputs.validDiet}
            isInvalid={invalidInputs.invalidDiet}
            as="textarea"
            placeholder="Dietary Restrictions"
          />
        </FloatingLabel>
        <div className="color-breed-hypo d-flex">
          <div className="breed-color d-flex">
            <FloatingLabel
              controlId="floatingInput"
              label="Breed:"
              className="mb-1"
            >
              <Form.Control
                name="pet-breed"
                className=" me-3"
                type="text"
                placeholder="Breed"
                style={{ minWidth: "55px" }}
                value={breed || ""}
                onChange={(e) => handleFormChange(e)}
                isValid={validInputs.validBreed}
                isInvalid={invalidInputs.invalidBreed}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Color:"
              className="mb-1"
            >
              <Form.Control
                name="pet-color"
                className="pet-form-color ms-2"
                type="text"
                placeholder="Color"
                style={{ minWidth: "35px" }}
                value={color || ""}
                onChange={(e) => handleFormChange(e)}
                isValid={validInputs.validColor}
                isInvalid={invalidInputs.invalidColor}
              />
            </FloatingLabel>
          </div>
        </div>
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Pet's Bio:"
          className=" mt-3"
        >
          <Form.Control
            name="pet-bio"
            className="petform-bio"
            value={petBio || ""}
            onChange={(e) => handleFormChange(e)}
            as="textarea"
            placeholder="Pet's Bio"
            style={{ height: "110px" }}
            isValid={validInputs.validBio}
            isInvalid={invalidInputs.invalidBio}
          />
        </FloatingLabel>
        <Form.Group controlId="formFile" className="mt-2 mb-3 w-75">
          <Form.Label
            id="pic-anchor"
            data-tooltip-content="Sorry for the inconvenience, but you must upload a pet's picture on each form submission"
            data-tooltip-place="top"
          >
            <Tooltip
              anchorId="pic-anchor"
              isOpen={invalidInputs.invalidImage ? true : false}
            />
            <span className="text-danger">*</span>{" "}
            {isAdmin && pet ? "Re-upload Picture:" : "Upload Picture:"}
          </Form.Label>
          <Form.Control
            name="pet-pic"
            className="add-pet-pic"
            type="file"
            size="sm"
            onChange={(e) => handleFormChange(e)}
            isValid={validInputs.validImage}
            isInvalid={invalidInputs.invalidImage}
            accept="image/*"
          />
        </Form.Group>
        {showSpinner ? (
          <Spinner
            animation="grow"
            className="position-absolute bottom-0 end-0 mb-5 me-2"
          />
        ) : (
          ""
        )}
        <Button
          variant="success"
          className="position-absolute bottom-0 end-0 me-4 mb-3"
          onClick={isAdmin && pet ? handleUpdate : handleSubmit}
        >
          {isAdmin && pet ? "Update Pet" : "Add Pet"}
        </Button>
      </div>
    </Form>
  );
}

export default PetForm;
