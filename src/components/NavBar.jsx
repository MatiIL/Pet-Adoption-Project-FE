import Container from "react-bootstrap/Container"
import { Button, Nav, Navbar, NavDropdown, Spinner } from "react-bootstrap"
import LoginModal from "./LoginModal"
import AdminMenu from "./AdminMenu"
import { useState, useEffect } from "react"
import { useAuthContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

function NavBar() {
  const [isActive, setIsActive] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);
  const { logout, token, isAdmin, showSpinner, getAllOwnedPets, getAllSavedPets } = useAuthContext();

  const navigate = useNavigate();

  const renderAdminMenu = () => {
    if (isAdmin) {
      setAdminMenu(true);
    }
    if (!isAdmin) setAdminMenu(false);
  };

  useEffect(() => {
    renderAdminMenu();
  }, [isAdmin]);

  useEffect(() => {
    if (window.location.pathname === "/FindPet") {
      setIsActive(true);
    } else if (window.location.pathname === "/") {
      setIsActive(false);
    }
  }, []);

  const handleLogout = async() => {
    try {
      await logout();
      if (!token) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getMyPets = async() => {
     await getAllOwnedPets();
     await getAllSavedPets();
     navigate("/MyPets")
  }

  return (
    <Navbar collapseOnSelect expand="md" variant="light" className="navbar">
      {adminMenu ? <AdminMenu /> : ""}
      <Container>
        <Nav>
          <div className="log-buttons d-flex">
            {token ? (
              <Button
                variant="outline-secondary"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <LoginModal />
            )}
          </div>
        </Nav>
        {showSpinner ? <Spinner className="ms-2" animation="grow" /> : ""}
        <Navbar.Brand as={Link}
          to="/"
          className={isActive ? "unselected-link" : "nav-link"}
        >
          Pet Adoption Center
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/FindPet"
              className={isActive ? "nav-link" : "unselected-link"}
            >
              <span 
              id="find-pets" 
              className={token ? "mt-2" : ""}
              >Find Me a Pet</span>
            </Link>
            <NavDropdown
              title="My Profile"
              id="collasible-nav-dropdown"
              className={token ? "visible" : "visually-hidden"}
            >
              <NavDropdown.Item onClick={getMyPets}>
                My Pets
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MyProfile">
                Profile Settings
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
