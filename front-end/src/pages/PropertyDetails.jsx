import { AppBar, Grid, ImageList, ImageListItem, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import MyCarousel from '../components/MyCarousel';
import { getPropertyById } from '../redux/property/propertySlice';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const PropertyDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { propertyById } = useSelector((state) => state.propertyHandler);
  const [property, setProperty] = useState();
  const [propertyImages, setPropertyImages] = useState([]);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const { status, data } = propertyById;
    if (status === 'OK') {
      setProperty(data);
      setPropertyImages(data?.images);
    }
    // status === 'OK' && setProperty(data);
  }, [propertyById]);

  useEffect(() => {
    dispatch(getPropertyById(id));
  }, [id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const {
    addPropertyType,
    newPropertySiteAddress,
    newPropertyCity,
    newPropertyPinCode,
    newPropertyStateWithCode,
    newPropertyGroupName,
  } = property || {};
  const {
    oldPropertyRoomNo,
    oldPropertySocietyAddress,
    oldPropertyName,
    oldPropertyAreaName,
    oldPropertyCity,
    oldPropertyLandmark,
    oldPropertyPinCode,
    oldPropertyState,
    oldPropertyOwnerName,
  } = property || {};

  const propertyAdd =
    addPropertyType === 'new-property'
      ? `${newPropertySiteAddress}, ${newPropertyCity} (${newPropertyPinCode}), ${newPropertyStateWithCode}`
      : `${oldPropertyRoomNo}, ${oldPropertySocietyAddress}, ${oldPropertyAreaName}, ${oldPropertyLandmark}, ${oldPropertyCity} (${oldPropertyPinCode}), ${oldPropertyState}`;

  const propertyName = addPropertyType === 'new-property' ? newPropertyGroupName : oldPropertyName;

  return (
    <>
      <MyCarousel imageList={propertyImages} />
      <Grid container className="p-5">
        <Grid item xs={5}>
          <ImageList variant="masonry" cols={2} gap={5}>
            {propertyImages.map((item, index) => (
              <ImageListItem key={item.img}>
                <img src={`${item}?w=248&fit=crop&auto=format`} alt={`img-${index}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={7}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="About Property"
            >
              <Tab label="About Property" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <h4>
                {property?.propertyType} Property ({property?.subPropertyType})
              </h4>
              <h5>Property Status : ({property?.propertyStatus})</h5>
              <div>
                <b>Name :</b> {propertyName}
              </div>
              {addPropertyType === 'new-property' ? (
                <div>
                  <b>Property Group Name :</b> {newPropertyGroupName}
                </div>
              ) : (
                <div>
                  <b>Property Owner Name :</b> {oldPropertyOwnerName}
                </div>
              )}
              <div>
                <b>Address :</b> {propertyAdd}{' '}
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Item Three
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>
    </>
  );
};

export default PropertyDetails;
