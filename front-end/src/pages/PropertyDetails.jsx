import { Container } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetail from '../components/property/PropertyDetail';
import { getPropertiesByUser, getPropertyById } from '../redux/property/propertySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

const PropertyDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { propertyById } = useSelector((state) => state.propertyHandler);
  const [property, setProperty] = useState();


  console.log('properties=--=-=--=-=-=-', id);

  useEffect(() => {
    console.log("propertyById....", propertyById);

    const { status, data } = propertyById;
    console.log("status....", status);
    console.log("dat....", data);

    status === 'OK' && setProperty(data);
  }, [propertyById])


  useEffect(() => {
    dispatch(getPropertyById(id));
  }, [])

console.log("property=-=--==-",property);
  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: '70px' }}>
        <PropertyDetail property={property} />
      </Container>
    </>
  );
};

export default PropertyDetails;
