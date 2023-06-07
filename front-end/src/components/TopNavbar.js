import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/images/ttb-logo.jpg';
import { getLocalStorageObject } from '../services/utils';
import './index.css';
import MyModal from './user/MyModal';

const TopNavbar = () => {
  const [registrationModal, setRegistrationModal] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const { verifyTokenResponse } = useSelector((store) => store.userHandler);
  const trackLocalStorage = useSelector((state) => state.trackLocalStorage);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('verifyTokenResponse', trackLocalStorage);
    trackLocalStorage.length > 0 && setIsUserLogin(true);
  }, [trackLocalStorage]);

  useEffect(() => {
    verifyTokenResponse?.valid && console.log(verifyTokenResponse.userData);
    verifyTokenResponse?.valid && setUserData(verifyTokenResponse.userData);
  }, [verifyTokenResponse]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.storageArea === localStorage) {
        if (event.key === 'user_token') {
          const userToken = getLocalStorageObject('user_token');
          userToken && setIsUserLogin(true);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // return () => {
    //   window.removeEventListener('storage', handleStorageChange);
    // };
  }, ['user_token']);

  // useEffect(() => {
  //   console.log("localStorage=-----------", localStorage);
  // }, [localStorage])

  // useEffect(() => {
  //   // const userToken = getCookie('user_token');
  //   console.log("=--------");
  //   const userToken = getLocalStorageObject('user_token');
  //   console.log("userToken", userToken);
  //   dispatch(verifyToken({ token: userToken }));
  // }, [])

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
              {/* <Nav.Link href="/">Home</Nav.Link> */}
              {/* <Nav.Link href="#link">Link</Nav.Link>  */}
            </Nav>
            <Nav>
              {isUserLogin ? (
                <>
                  <Nav.Link className="text-white" href="/user/profile">
                    <Avatar>{userData?.name}</Avatar>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link className="text-white" href="/userAuth">
                  SignIn / SignUp
                </Nav.Link>
              )}

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
      <MyModal showModal={registrationModal} handleCloseModal={setRegistrationModal} />
    </>
  );
};

export default TopNavbar;
