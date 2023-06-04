import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import AddProperty from './pages/AddProperty';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Properties from './pages/Properties';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';
import { updateSnackBar } from './redux/common/snackBarSlice';
import { useEffect, useState } from 'react';
import Login from './components/user/Login';
import Registration from './components/user/Registration';

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
      <HashRouter>
        <TopNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/property/:propertyType" element={<Properties />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={mainSnackBar[0].open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={mainSnackBar[0].severity} sx={{ width: '100%' }}>
            {mainSnackBar[0].message}
          </Alert>
        </Snackbar>
      </HashRouter>
    </>
  );
};

export default App;
