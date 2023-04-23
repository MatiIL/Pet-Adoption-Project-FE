import Container from "react-bootstrap/Container";
import { Button, Nav, Navbar, NavDropdown, Spinner } from "react-bootstrap";
import LoginModal from "./LoginModal";
import AdminMenu from "./AdminMenu";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext"

function NavBar() {
  const [isActive, setIsActive] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);
  const { logout, token, isAdmin, showSpinner } = useAuthContext();

  const renderAdminMenu = () => {
    if (isAdmin) {
      setAdminMenu(true);
    } 
    if (!isAdmin) setAdminMenu(false);
  }

  useEffect(() => {
    renderAdminMenu();
  }, [isAdmin])
  
  useEffect(() => {
    if (window.location.pathname === "/FindPet") {
      setIsActive(true);
    } else if (window.location.pathname === "/") {
      setIsActive(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      if (!token) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar collapseOnSelect expand="md" variant="light" className="navbar">
      {adminMenu? <AdminMenu/> : ""}
      <Container>
      <Nav className="">
            <div className="log-buttons d-flex">
            { token  ? (<Button variant="outline-secondary" className="logout-btn" 
            onClick={handleLogout}
            >
              Logout</Button>): <LoginModal />}
              </div>
          </Nav>
          {showSpinner ? 
          <Spinner className="ms-2" animation="grow" />
          : ""
          }
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
              className={isActive ? "nav-link" : "unselected-link"}
            >
              <div id="find-pets">
              Find Me a Pet
              </div>
            </Nav.Link>
            <NavDropdown
              title="My Profile"
              id="collasible-nav-dropdown"
              className={token? 'visible':'visually-hidden'}
            >
              <NavDropdown.Item href="/MyPets"
              >My Pets</NavDropdown.Item>
              <NavDropdown.Item href="/MyProfile">
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
