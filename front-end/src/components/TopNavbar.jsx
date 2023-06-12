import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/ttb-logo.jpg';
import './index.css';

const TopNavbar = () => {
  return (
    <>
      <Navbar fixed="top" className="top-navbar" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} width="90" height="30" className="d-inline-block align-top" alt="Talk To Broker" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link className="text-white" href="/userAuth">
                <AccountCircleTwoToneIcon fontSize='large'/>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TopNavbar;
