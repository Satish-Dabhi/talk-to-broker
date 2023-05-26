import { Card, CardMedia } from '@mui/material';
import React from 'react';

const BannerImage = ({ image }) => {
  return (
    <Card className="banner-image">
      <div style={{ position: 'relative' }}>
        <CardMedia style={{ height: '500px' }} component="img" image={image} title="BannerImage" alt="BannerImage" />
        <div
          className="hover-1"
          style={{ position: 'absolute', color: '#003564', top: '20%', left: '15%', width: '20vw', transform: 'translateX(-50%)' }}
        >
          <h1>Your Gateway to Buying and Selling Properties</h1>
        </div>
      </div>
    </Card>
  );
};

export default BannerImage;
