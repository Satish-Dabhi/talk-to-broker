import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties } from '../redux/property/propertySlice';
import PropertyCard from '../components/property/PropertyCard';
import { Container } from '@mui/material';

const PropertyDetails = () => {
  let { propertyType } = useParams();
  const { properties } = useSelector((store) => store.propertyHandler);
  const [propertyArray, setPropertyArray] = React.useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getProperties());
  }, []);

  React.useEffect(() => {
    console.log('propertiesproperties', properties);
    const { status, data } = properties;
    status === 'OK' && setPropertyArray(data);
  }, [properties]);

  console.log('propertyArray', propertyArray);

  console.log('propertyType', propertyType);
  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: '70px' }}>
        <h1>Property Detail</h1>
        <PropertyCard />
      </Container>
    </>
  );
};

export default PropertyDetails;
