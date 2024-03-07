import { Nav } from 'react-bootstrap';
import { BsFillGridFill, BsClipboardData, BsPeople, BsBuilding, BsPersonFill } from 'react-icons/bs'; // Import icons from React Icons
import { FiLogOut } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/sidebar.css'; // Import custom CSS for the sidebar

function Sidebar() {
    return (
      <Nav className="col-md-3 col-lg-2 d-md-block sidebar">
        <div className="sidebar-sticky">
          <Nav.Item>
            <Nav.Link href="#dashboard" className="sidebar-link">
              <BsFillGridFill className="sidebar-icon" /> <span className="sidebar-text">Dashboard</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#attendance" className="sidebar-link">
              <BsClipboardData className="sidebar-icon" /> <span className="sidebar-text">Attendance</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#members" className="sidebar-link">
              <BsPeople className="sidebar-icon" /> <span className="sidebar-text">Members</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#subunits" className="sidebar-link">
              <BsBuilding className="sidebar-icon" /> <span className="sidebar-text">Sub-units</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#profiles" className="sidebar-link">
              <BsPersonFill className="sidebar-icon" /> <span className="sidebar-text">Profiles</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#logout" className="sidebar-link logout-link">
              <FiLogOut className="sidebar-icon" /> <span className="sidebar-text">Logout</span>
            </Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
    );
  }
  
  export default Sidebar;