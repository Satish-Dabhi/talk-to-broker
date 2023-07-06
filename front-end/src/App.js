import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import TopNavbar from './components/TopNavbar';
import SignInSignUpForms from './components/user/SignInSignUpForms';
import AddProperty from './pages/AddProperty';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import UserProfile from './pages/UserProfile';
import { updateSnackBar } from './redux/common/snackBarSlice';
import AddBuyerInquiry from './pages/AddBuyerInquiry';

const App = () => {
  const dispatch = useDispatch();
  const snackBar = useSelector((state) => state.snackbar);
  const [mainSnackBar, setMainSnackBar] = useState(snackBar);
  useEffect(() => {
    setMainSnackBar(snackBar);
  }, [snackBar]);

  const handleSnackbarClose = () => {
    dispatch(
      updateSnackBar({
        open: false,
        message: '',
        severity: 'success',
      })
    );
  };

  return (
    <>
      <BrowserRouter>
        <TopNavbar />
        <div className='top-div'></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:propertyType" element={<Properties />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
          <Route path="/userAuth" element={<SignInSignUpForms />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          <Route path="/user" element={<ProtectedRoute />}>
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/add-property" element={<AddProperty />} />
            <Route path="/user/add-buyer" element={<AddBuyerInquiry />} />
          </Route>
        </Routes>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={mainSnackBar[0].open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={mainSnackBar[0].severity} sx={{ width: '100%' }}>
            {mainSnackBar[0].message}
          </Alert>
        </Snackbar>
      </BrowserRouter>
    </>
  );
};

export default App;
