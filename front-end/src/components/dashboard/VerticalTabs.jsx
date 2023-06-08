import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from './DataTable';

const VerticalTabs = ({ userData }) => {
  console.log('..............', userData);
  const [selectedTab, setSelectedTab] = useState(1);
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
        <Tab label="Your Property" />
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
            <DataTable />
          </>
        )}
        {selectedTab === 3 && <div>Tab 3 Content</div>}
      </Box>
    </Box>
  );
};

export default VerticalTabs;
