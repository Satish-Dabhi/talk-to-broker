import { Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import EnrollForm from './EnrollForm';
import registrationSchema from '../../formsDefinitions/userRegistration/schema.json';
import registrationUiSchema from '../../formsDefinitions/userRegistration/uiSchema.json';
import loginSchema from '../../formsDefinitions/userLogin/schema.json';
import loginUiSchema from '../../formsDefinitions/userLogin/uiSchema.json';
import verticalImage from '../../assets/images/banner-images/vertical-building.jpg';
import CloseIcon from '@mui/icons-material/Close';
import './style.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SignInSignUpForms = ({ handleClose }) => {
  const [value, setValue] = React.useState(0);
  const [showVerifyForm, setShowVerifyForm] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, overflowX: 'hidden' }}>
      <Grid container>
        <Grid item xs={5}>
          <img src={verticalImage} alt="vertical-building" width={'100%'} height={'100%'} />
        </Grid>
        <Grid item xs={7}>
          <Box sx={{ width: '100%' }}>
            {!showVerifyForm ? (
              <Box sx={{ borderBottom: 1 }}>
                <Tabs value={value} onChange={handleChange} className="tab-container">
                  <Tab label="Login" sx={{ width: '40%' }} />
                  <Tab label="Registration" sx={{ width: '40%' }} />
                  <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" sx={{ width: '20%' }}>
                    <CloseIcon />
                  </IconButton>
                </Tabs>
              </Box>
            ) : (
              <Box sx={{ borderBottom: 1, float: 'right' }}>
                <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" sx={{ width: '100%' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            <TabPanel value={value} index={0}>
              <EnrollForm schema={loginSchema} uiSchema={loginUiSchema} form="login" />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <EnrollForm
                schema={registrationSchema}
                uiSchema={registrationUiSchema}
                form="registration"
                verifyForm={(flag) => setShowVerifyForm(flag)}
              />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInSignUpForms;
