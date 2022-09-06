import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import PetModal from './PetModal'

function AdminMenu() {

    return (
        <>
        <DropdownButton
        id="dropdown-button-dark-example2"
        variant="secondary"
        menuVariant="dark"
        title="Admin Tools"
        className="ms-3 p-2"
      >
        <Dropdown.Item href="/UsersPage" className="ms-3" >
        See All Users
        </Dropdown.Item>
        <Dropdown.Item href="/ManagePets" className="ms-3">See All Pets</Dropdown.Item>
        <Dropdown.Item href="#addpet" id="add-pet">
            <PetModal />
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
}

export default AdminMenu;