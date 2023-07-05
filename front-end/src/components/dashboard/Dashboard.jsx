import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertiesDataTable from './PropertiesDataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertiesByUser } from '../../redux/property/propertySlice';
import AboutUser from './AboutUser';
import { removeSessionStorageObject } from '../../services/utils';
import * as constant from '../../services/utils/constant';
import BuyerInquiriesDataTable from './BuyerInquiriesDataTable';

const Dashboard = ({ userData }) => {
  const { propertiesByUser } = useSelector((store) => store.propertyHandler);
  const [selectedTab, setSelectedTab] = useState(0);
  const [properties, setProperties] = useState({});
  const dispatch = useDispatch();


  useEffect(() => {
    userData?.id && dispatch(getPropertiesByUser(userData?.id));
  }, [userData?.id])

  React.useEffect(() => {
    const { status, data } = propertiesByUser;
    status === 'OK' && setProperties(data);
  }, [propertiesByUser]);

  let navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', paddingTop: '5%' }}>
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
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {selectedTab === 0 && <AboutUser userData={userData} />}
        {selectedTab === 1 && (
          <>
            <div className="row">
              <div className="d-flex justify-content-end">
                <Button variant="contained" size="small" onClick={() => {
                  removeSessionStorageObject(constant.PROPERTY_SESSION_KEY);
                  navigate(`/user/add-property`);
                }}>
                  Add Property
                </Button>
              </div>
            </div>
            <br />
            <PropertiesDataTable data={properties} />
          </>
        )}
        {selectedTab === 2 && (
          <>
            <div className="row">
              <div className="d-flex justify-content-end">
                <Button variant="contained" size="small" onClick={() => {
                  removeSessionStorageObject(constant.BUYER_INQUIRY_SESSION_KEY);
                  navigate(`/user/add-buyer`);
                }}>
                  Add Buyer Inquiry
                </Button>
              </div>
            </div>
            <br />
            <BuyerInquiriesDataTable data={properties} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
