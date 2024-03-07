import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { FaUser } from 'react-icons/fa'; // Import the user icon

function CustomNavbar() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Tech Unit Attendace </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Nav.Link href="#" className="mr-2 ml-auto"> {/* Add ml-auto class here */}
          <FaUser /> Admin
        </Nav.Link>
        <Button variant="outline-dark">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
