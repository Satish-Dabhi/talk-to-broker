import { Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import EnrollForm from './EnrollForm';
import registrationSchema from '../../formsDefinitions/userRegistration/schema.json';
import registrationUiSchema from '../../formsDefinitions/userRegistration/uiSchema.json';
import loginSchema from '../../formsDefinitions/userLogin/schema.json';
import loginUiSchema from '../../formsDefinitions/userLogin/uiSchema.json';
import verticalImage from '../../assets/images/banner-images/vertical-building.jpg';
import CloseIcon from '@mui/icons-material/Close';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, overflowX: 'hidden' }}>
      <Grid container>
        <Grid item xs={4}>
          <img src={verticalImage} alt="vertical-building" width={'100%'} height={'100%'} />
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Login" />
                <Tab label="Registration" />
                <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <EnrollForm schema={loginSchema} uiSchema={loginUiSchema} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <EnrollForm schema={registrationSchema} uiSchema={registrationUiSchema} />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInSignUpForms;
