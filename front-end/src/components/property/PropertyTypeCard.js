import { Button, Card, CardActions, CardMedia } from '@mui/material';
import React from 'react';
import { getCardImageByPropertyType } from '../../services/utils';
import { useNavigate } from 'react-router-dom';

const PropertyTypeCard = ({ propertyDetails }) => {
  let navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 200, color: "#f7f7f7" }}>
      <CardMedia
        sx={{
          height: 120,
          ':hover': {
            boxShadow: 20,
          },
        }}
        image={getCardImageByPropertyType(propertyDetails?.propertyType)}
        title={`${propertyDetails?.propertyType}-image`}
      />
      <CardActions>
        <Button size="small" onClick={() => navigate(`/property/${propertyDetails.propertyType}`)}>
          {propertyDetails?.label}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyTypeCard;
