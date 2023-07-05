import { Button, Card, CardActions, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { getCardImageByPropertyType } from '../../services/utils';
import { useNavigate } from 'react-router-dom';

const PropertyTypeCard = ({ propertyDetails }) => {
  let navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 230, color: "#f7f7f7" }}>
      <CardMedia
        sx={{
          height: 200,
          ':hover': {
            boxShadow: 20,
          },
        }}
        image={getCardImageByPropertyType(propertyDetails?.propertyType)}
        title={`${propertyDetails?.propertyType}-image`}
      />
      <CardActions>
        <Button size="small" onClick={() => navigate(`/property/${propertyDetails.propertyType}`)}>
          <Typography variant="h3" gutterBottom sx={{ fontSize: '22px', fontWeight: '600' }}>
            {propertyDetails?.label}
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyTypeCard;
