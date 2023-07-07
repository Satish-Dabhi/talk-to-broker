import React, { useEffect, useState } from 'react';
import MyCarousel from '../MyCarousel';

const PropertyDetail = ({ property }) => {
  const [propertyImages, setPropertyImages] = useState([]);
  const [propertyDetail, setPropertyDetail] = useState();

  useEffect(() => {
    setPropertyDetail(property);
    setPropertyImages(propertyDetail?.images);
  }, [property]);

  return (
    <>
      <MyCarousel imageList={propertyImages} />
    </>
  );
};

export default PropertyDetail;
