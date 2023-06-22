import { Container } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropertyCard from '../components/property/PropertyCard';
import { getPropertiesByType } from '../redux/property/propertySlice';
import { convertToTitleCase } from '../services/utils';

const Properties = () => {
  let { propertyType } = useParams();
  const { propertiesByType } = useSelector((store) => store.propertyHandler);
  const [properties, setProperties] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPropertiesByType(propertyType));
  }, [propertyType]);

  React.useEffect(() => {
    const { status, data } = propertiesByType;
    status === 'OK' && setProperties(data);
  }, [propertiesByType]);

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: '70px' }}>
        <h1> {convertToTitleCase(propertyType)} Properties</h1>
        {properties &&
          properties.length > 0 &&
          properties.map((property) => {
            return <PropertyCard propertyDetails={property} />;
          })}
      </Container>
    </>
  );
};

export default Properties;
