import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

function NavBar() {

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Pet Adoption Center</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/SearchPet" className='mt-1'>Find Me a Pet</Nav.Link>
            <NavDropdown title="My Profile" id="collasible-nav-dropdown" className='mt-1 visually-hidden'>
              <NavDropdown.Item href="#action/3.1">My Pets</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Profile Settings
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className='me-2'>
            <SignupModal/>
          </Nav>
          <Nav>
            <LoginModal/>
          </Nav>
          <Nav className='ms-2'>
            <Button variant='secondary'>Logout</Button>
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;