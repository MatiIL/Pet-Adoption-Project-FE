import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SearchForm() {
    return (
        <>
        <div className='search-fields d-flex flex-column justify-content-between ms-3 mt-2'>
        <Form.Select aria-label="Select type of pet" >
      <option>Type</option>
      <option value="1">Cat</option>
      <option value="2">Dog</option>
    </Form.Select>
    <Form.Select aria-label="pet's status" className='w-100 mt-3'>
    <option>Adoption Status</option>
    <option value="1">Available</option>
    <option value="2">Fostered</option>
    <option value="3">Adopted</option>
  </Form.Select>
        <Form.Control className='w-100 mt-3' type="text" placeholder='Name'/>
        <Form.Control className='w-100 mt-3' type="text" placeholder='Height'/>
        <Form.Control className='w-100 mt-3' type="text" placeholder='Weight'/>
        <Button className='w-50 mt-3' >Search</Button>
        </div>
  </>
    )
}

export default SearchForm;