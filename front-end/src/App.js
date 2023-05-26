import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import AddProperty from './pages/AddProperty';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Properties from './pages/Properties';

const App = () => {
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
    </HashRouter>
  );
};

export default App;
