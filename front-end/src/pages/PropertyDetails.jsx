import { Container } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
  let { id } = useParams();
  console.log('properties=--=-=--=-=-=-', id);

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: '70px' }}>
        <h1>Property Detail</h1>
        {id}
      </Container>
    </>
  );
};

export default PropertyDetails;
