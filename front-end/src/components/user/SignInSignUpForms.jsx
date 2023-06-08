import { Grid, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginSchema from '../../formsDefinitions/userLogin/schema.json';
import loginUiSchema from '../../formsDefinitions/userLogin/uiSchema.json';
import registrationSchema from '../../formsDefinitions/userRegistration/schema.json';
import registrationUiSchema from '../../formsDefinitions/userRegistration/uiSchema.json';
import { POST_API, VERIFY_TOKEN_END_POINT } from '../../redux/services/api';
import { getLocalStorageObject } from '../../services/utils';
import EnrollForm from './EnrollForm';
import CryptoJS from 'crypto-js';
import './user.css';
import { LOCAL_OBJECT_SECRET_KEY } from '../../services/utils/constant';

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
  const token = getLocalStorageObject('token');
  const decryptedToken = token && CryptoJS.AES.decrypt(token, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  const userToken = JSON.parse(decryptedToken);
  let navigate = useNavigate();

  useEffect(() => {
    async function validToken() {
      const resp = await POST_API(VERIFY_TOKEN_END_POINT, { token: userToken?.token });
      if (resp?.valid) {
        navigate('/user/profile');
      }
    }
    userToken && validToken();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, overflowX: 'hidden' }}>
      <Grid container sx={{ justifyContent: 'center', height: '100vh' }}>
        <Grid item xs={8}>
          <Box sx={{ width: '100%', padding: '13% 0 0' }}>
            {!showVerifyForm ? (
              <Box sx={{ borderBottom: 1 }}>
                <Tabs value={value} onChange={handleChange} className="tab-container">
                  <Tab label="Login" sx={{ width: '40%' }} />
                  <Tab label="Registration" sx={{ width: '40%' }} />
                </Tabs>
              </Box>
            ) : (
              <Box sx={{ borderBottom: 1 }}>
                <Tabs className="tab-container">
                  <Tab label="Registration" sx={{ width: '100%' }} />
                </Tabs>
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
