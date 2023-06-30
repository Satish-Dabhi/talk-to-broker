import { Container, Grid, Typography } from '@mui/material';
import * as React from 'react';
import { Parallax } from "react-parallax";
import Typewriter from 'typewriter-effect';
import PropertyTypeCard from '../components/property/PropertyTypeCard';

const Home = () => {
  const propertyTypeArray = [
    {
      propertyType: 'residential',
      label: 'Residential Property',
    },
    {
      propertyType: 'commercial',
      label: 'Commercial Property',
    },
    {
      propertyType: 'industrial',
      label: 'Industrial Property',
    },
    {
      propertyType: 'agricultural',
      label: 'Agricultural Property',
    },
  ];

  const insideStyles = {
    background: "white",
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  };

  const image1 =
    "https://images.pexels.com/photos/830891/pexels-photo-830891.jpeg";

  return (
    <>
      <Parallax bgImage={image1} strength={500}>
        <div style={{ height: 500 }}>
          <div style={insideStyles}>
            <Typewriter
              options={{
                strings: ['TALK TO BROKER', 'Your Gateway to Buying and Selling Properties'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
      </Parallax>
      <Container maxWidth="lg" sx={{ paddingTop: '70px' }} className='text-center'>
        <Typography variant="h2" gutterBottom sx={{ fontSize: '45px', fontWeight: '700' }}>
          Visit Properties
        </Typography>
        <Grid container spacing={2} className='text-center'>
          {propertyTypeArray &&
            propertyTypeArray.length > 0 &&
            propertyTypeArray.map((property) => {
              return (
                <>
                  <Grid item xs={12} sm={6} md={3}>
                    <PropertyTypeCard propertyDetails={property} />
                  </Grid>
                </>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
