import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/images/ttb-logo.jpg";
import './index.css'
import MyModal from "./MyModal";
import { useState } from "react";
import EnrollForm from "./user/EnrollForm";
import registrationSchema from '../formsDefinitions/userRegistration/schema.json';
import registrationUiSchema from '../formsDefinitions/userRegistration/uiSchema.json';

const TopNavbar = () => {
    const [registrationModal, setRegistrationModal] = useState(false);

    return (
        <><Navbar fixed="top" className="top-navbar" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/#/">
                    <img
                        src={logo}
                        width="90"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Talk To Broker" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="/">Home</Nav.Link> */}
                        {/* <Nav.Link href="#link">Link</Nav.Link>  */}
                    </Nav>
                    <Nav>
                        <Nav.Link className="text-white" href="/#/add-property">Add Property</Nav.Link>
                        <Nav.Link className="text-white" onClick={() => setRegistrationModal(true)}>Registration</Nav.Link>
                        {/* <NavDropdown
        className="text-white"
        title="Add Property"
        id="basic-nav-dropdown"
    >
        <NavDropdown.Item href="/add-property/developers">
            Developers Property
        </NavDropdown.Item>
        <NavDropdown.Item href="/add-property/old">
            Old Property
        </NavDropdown.Item>
    </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            {console.log("registrationModal", registrationModal)}
            <MyModal
                showModal={registrationModal}
                handleCloseModal={setRegistrationModal}
                body={<EnrollForm schema={registrationSchema} uiSchema={registrationUiSchema} />}
            /></>
    );
};

export default TopNavbar;
