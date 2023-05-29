import { Card, CardMedia, Typography } from '@mui/material';
import React from 'react';

const BannerImage = ({ image }) => {
  return (
    <Card className="banner-image">
      <div style={{ position: 'relative' }}>
        <CardMedia style={{ height: '500px' }} component="img" image={image} title="Talk To Broker" alt="BannerImage" />
        <div
          className="hover-1"
          style={{ position: 'absolute', color: '#003564', top: '20%', left: '15%', width: '20vw', transform: 'translateX(-50%)' }}
        >
          <Typography variant="h3" gutterBottom>
            Your Gateway to Buying and Selling Properties
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default BannerImage;
