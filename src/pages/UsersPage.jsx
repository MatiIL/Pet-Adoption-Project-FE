import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import {
  Stack,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import SignupForm from "../components/SignupForm";

function UsersPage() {
  const { getAllUsers, allUsers, getUserInfo, isAdmin, showSpinner } =
    useAuthContext();
  const [lgShow, setLgShow] = useState(false);
  const [wasUserClicked, setWasUserClicked] = useState(false);

  const handleClose = () => {
    setLgShow(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleClick = async (e) => {
    if (isAdmin) {
      await getUserInfo(e.target.innerText);
      setWasUserClicked(true);
      setLgShow(true);
    }
  };

  return (
    <div className="users-wrapper d-flex mt-4">
      <div className="users-list d-flex flex-column w-50">
        <h3 className="users-header">
          <span>
            {showSpinner ? <Spinner animation="grow" className="me-4" /> : ""}
          </span>
          All Users
        </h3>

        <Container fluid className="d-flex flex-wrap ms-3 bg-light">
          <Row>
            {allUsers &&
              allUsers.map((user) => (
                <Stack
                  key={user.userId}
                  direction="horizontal"
                  gap={3}
                  className="d-flex ms-2 mt-3 mb-2 border bg-light"
                >
                  <Col>
                    <Button onClick={handleClick} variant="outline-secondary">
                      {user.userId}
                    </Button>
                  </Col>
                  <Col className="">{user.firstName}</Col>
                  <Col className=" ps-2 pe-2">{user.lastName}</Col>
                </Stack>
              ))}
          </Row>
        </Container>
      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            User Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm wasUserClicked={wasUserClicked} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UsersPage;
