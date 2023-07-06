import { Box, Button, Tab, Tabs, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPropertiesByUser } from '../../redux/property/propertySlice';
import { removeSessionStorageObject } from '../../services/utils';
import * as constant from '../../services/utils/constant';
import AboutUser from './AboutUser';
import BuyerInquiriesDataTable from './BuyerInquiriesDataTable';
import PropertiesDataTable from './PropertiesDataTable';

const Dashboard = ({ userData }) => {
  const { propertiesByUser } = useSelector((store) => store.propertyHandler);
  const [selectedTab, setSelectedTab] = useState(0);
  const [properties, setProperties] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    userData?.id && dispatch(getPropertiesByUser(userData?.id));
  }, [userData?.id]);

  React.useEffect(() => {
    const { status, data } = propertiesByUser;
    status === 'OK' && setProperties(data);
  }, [propertiesByUser]);

  let navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const smallScreen = useMediaQuery('(max-width: 768px)');

  console.log("smallScreensmallScreen",smallScreen);

  return (
    <>
      {smallScreen && (
        <Tabs
          orientation="horizonal"
          variant="scrollable"
          value={selectedTab}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: 'divider'}}
        >
          <Tab label="About Yourself" />
          <Tab label="Your Properties" />
          <Tab label="Buyers" />
        </Tabs>
      )}
      <Box sx={{ display: 'flex', paddingTop: '5%' }}>
        {!smallScreen && (
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={selectedTab}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: 'divider', height: '100vh' }}
          >
            <Tab label="About Yourself" />
            <Tab label="Your Properties" />
            <Tab label="Buyers" />
          </Tabs>
        )}
        <Box sx={{ flexGrow: 1, p: 2 }}>
          {selectedTab === 0 && <AboutUser userData={userData} />}
          {selectedTab === 1 && (
            <>
              <div className="row">
                <div className="d-flex justify-content-end">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      removeSessionStorageObject(constant.PROPERTY_SESSION_KEY);
                      navigate(`/user/add-property`);
                    }}
                  >
                    Add Property
                  </Button>
                </div>
              </div>
              <br />
              <PropertiesDataTable data={properties} smallScreen={smallScreen}/>
            </>
          )}
          {selectedTab === 2 && (
            <>
              <div className="row">
                <div className="d-flex justify-content-end">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      removeSessionStorageObject(constant.BUYER_INQUIRY_SESSION_KEY);
                      navigate(`/user/add-buyer`);
                    }}
                  >
                    Add Buyer Inquiry
                  </Button>
                </div>
              </div>
              <br />
              <BuyerInquiriesDataTable data={properties} smallScreen={smallScreen}/>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
