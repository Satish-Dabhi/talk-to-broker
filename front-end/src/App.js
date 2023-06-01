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

const App = () => {
  const dispatch = useDispatch();
  const snackBar = useSelector(state => state.snackbar);
  console.log("snackBar",snackBar);
  const { open, severity, message } = snackBar;
  console.log("........................", snackBar);
  const handleSnackbarClose = () => {
    dispatch(
      updateSnackBar({
        open: false,
        message: '',
        severity: 'success',
      })
    )
  };

  return (
    <HashRouter>
      <TopNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/property/:propertyType" element={<Properties />} />
        <Route path="/property-details/:id" element={<PropertyDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </HashRouter>
  );
};

export default App;
