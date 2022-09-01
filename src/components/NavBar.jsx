import Container from "react-bootstrap/Container";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import LoginModal from "./LoginModal";
import AdminMenu from "./AdminMenu";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

function NavBar() {
  const [isActive, setIsActive] = useState(false);
  const { auth, logout } = useAuthContext();
  
  useEffect(() => {
    if (window.location.pathname === "/FindPet") {
      setIsActive(true);
    } else if (window.location.pathname === "/") {
      setIsActive(false);
    }
  }, []);

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <AdminMenu/>
      <Container>
        
        <Navbar.Brand
          href="/"
          className={isActive ? "unselected-link" : "nav-link"}
        >
          Pet Adoption Center
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/FindPet"
              id="find-pets"
              className={isActive ? "nav-link" : "unselected-link"}
            >
              Find Me a Pet
            </Nav.Link>
            <NavDropdown
              title="My Profile"
              id="collasible-nav-dropdown"
              className={auth? 'visible':'visually-hidden'}
              // {...isActive ? "nav-link" : "unselected-link"}
            >
              <NavDropdown.Item href="/MyPets">My Pets</NavDropdown.Item>
              <NavDropdown.Item href="/MyProfile">
                Profile Settings
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="me-3">
            <div className="log-button d-flex">
            { auth  ? (<Button variant="secondary" className="ms-2"
            onClick={logout}
            >
              Logout</Button>): <LoginModal />}
              </div>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
