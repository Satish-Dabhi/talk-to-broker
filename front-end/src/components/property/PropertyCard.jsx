import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import commercialPropertyIcon from '../../assets/images/commercial-property.jpg';


const PropertyCard = ({ propertyDetails }) => {
  let navigate = useNavigate();

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={commercialPropertyIcon}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
      </Box>
      
    </Card>
  );
};

export default PropertyCard;
