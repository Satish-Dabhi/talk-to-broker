import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from './DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertiesByUser } from '../../redux/property/propertySlice';

const Dashboard = ({ userData }) => {
  const { propertiesByUser } = useSelector((store) => store.propertyHandler);
  const [selectedTab, setSelectedTab] = useState(1);
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
        <>
          <AccountCircleIcon sx={{ fontSize: '10rem' }} />
          <h6>{userData && userData?.name}</h6>
        </>
        <Tab label="About Yourself" />
        <Tab label="Your Events" />
        <Tab label="Tab 3" />
      </Tabs>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {selectedTab === 1 && <div>Tab 1 Content</div>}
        {selectedTab === 2 && (
          <>
            <div className="row">
              <div className="d-flex justify-content-end">
                <Button variant="contained" size="small" onClick={() => navigate(`/user/add-property`)}>
                  Add Property
                </Button>
              </div>
            </div>
            <br />
            <DataTable data={properties} />
          </>
        )}
        {selectedTab === 3 && <div>Tab 3 Content</div>}
      </Box>
    </Box>
  );
};

export default Dashboard;
