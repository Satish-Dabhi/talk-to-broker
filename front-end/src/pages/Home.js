import { Container, Grid, Typography } from '@mui/material';
import * as React from 'react';
import bannerImage3 from '../assets/images/banner-images/bg-home3.jpg';
import BannerImage from '../components/BannerImage';
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
  return (
    <>
      <BannerImage image={bannerImage3} />
      <Container maxWidth="lg" sx={{ paddingTop: '70px' }}>
        <Typography variant="h4" gutterBottom>
          Property Type:
        </Typography>
        <Grid container spacing={2}>
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
