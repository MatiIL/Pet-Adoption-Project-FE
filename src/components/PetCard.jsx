import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function PetCard({ pet }) {
    
    return (
       <Card className='mb-3'>
       <Card.Img variant="top" src={'../../dog.jpg'} />
       <Card.Body>
         <Card.Title className='fs-5'>{pet.name}</Card.Title>
       </Card.Body>
       <Card.Footer className='d-flex justify-content-around'>
         <small className="text-muted border border-dark rounded-pill p-2">{pet.adoptionStatus}</small>
         <Link to="/PetPage" className='links mt-2 link-dark text-decoration-none'>SEE MORE</Link>
       </Card.Footer>
     </Card>
    );
  }
  
  export default PetCard;

//   <div className="ms-2 me-2">
//   <div className="img-box">
//     <Image fluid rounded 
    
//   </div>
//   <div className="petBody">
//     <h5></h5>
//     <p></p>
//   </div>
// </div>