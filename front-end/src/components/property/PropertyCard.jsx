import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { convertToTitleCase, getCardImageByPropertyType } from '../../services/utils';

const PropertyCard = ({ propertyDetails }) => {
  let navigate = useNavigate();

  return (
    <Card sx={{ display: 'flex', margin: '10px 0', boxShadow: '0 8px 10px 0 rgb(0 0 0 / 50%)', }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={getCardImageByPropertyType(propertyDetails.propertyType)}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {convertToTitleCase(propertyDetails?.subPropertyType)}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {propertyDetails?.dateOfEntry}
          </Typography>
          <CardActions>
            <Button size="small" onClick={() => navigate(`/property-details/${propertyDetails?._id}`)}>
              More About Property
            </Button>
          </CardActions>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PropertyCard;
