import { Button, Snackbar, TextField, Typography } from '@material-ui/core';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import { withTheme } from '@rjsf/core';
import { Theme5 as Mui5Theme } from '@rjsf/material-ui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as constant from '../../services/utils/constant';
import ObjectFieldTemplate from '../ObjectFieldTemplate';
import { generateOTP, getSchemaFieldTitle } from '../../services/utils';
import RadioWidget from '../customWidgets/RadioWidget';
import { sendEmail } from '../../redux/email/emailSlice';
import { createUser, getUserByEmail } from '../../redux/user/userSlice';
import { Alert } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: constant.OUTLINED_FORM_VARIANT,
      },
    },
  },
});

const Form = withTheme(Mui5Theme);

console.log('new Date()', new Date());

const EnrollForm = (props) => {
  const { schema, uiSchema, form } = props;
  const [formData, setFormData] = useState({});
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: ''
  });
  const [validateForm, setValidateForm] = useState(false);
  const { addUser, userByEmail, userByEmailLoader } = useSelector((store) => store.userHandler);
  const dispatch = useDispatch();

  console.log('userByEmail', userByEmail);
  console.log('userByEmailLoader', userByEmailLoader);

  const transformErrors = (errors) => {
    return errors.map((error) => {
      if (error.name === 'required') {
        const fieldTitle = getSchemaFieldTitle(error.property);
        return {
          ...error,
          message: `${fieldTitle} is required`,
        };
      }
      return error;
    });
  };

  const handleSubmit = ({ formData }) => {
    console.log('formData...............', formData);
    if (form === 'registration') {
      dispatch(getUserByEmail(formData.email));
      if (!userByEmailLoader && userByEmail?.data?.length === 0) {
        const otp = generateOTP();
        const userData = {
          email: formData.email,
          iAm: formData.iAm,
          name: formData.name,
          password: formData.password,
          createTime: new Date(),
          otp: otp,
        };
        console.log('userData...............userData', userData);

        // dispatch(createUser(userData));

        const mailOptions = {
          from: 'babyboss65166516@gmail.com',
          to: formData.email,
          subject: 'Welcome',
          emailBody: `Your Otp is ${otp}`,
        };
        // dispatch(sendEmail(mailOptions));
        setShowOTP(true);
      } else {
        setSnackbar({
          open: true,
          message: "This email address is already exist"
        })
      }
    }
  };

  const validatePasswordMatch = (formData, errors) => {
    if (form === 'registration') {
      const { password, rePassword } = formData;
      if (password !== rePassword) {
        errors.rePassword.addError('Password and Re-Password should be same');
      }
    }
    return errors;
  };

  const handleChange = ({ formData }) => {
    console.log('formData', formData);
    setFormData(formData);
  };

  const verifyCode = (email) => {
    dispatch(getUserByEmail(email));
    if(otp === userByEmail?.data[0].otp){
      
    }
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const widgets = {
    radio: RadioWidget,
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="enroll-modal">
        {showOTP ? (
          <>
            <Typography variant="h5" gutterBottom>
              Verify
            </Typography>
            <Typography variant="h6" gutterBottom>
              Enter 6 digit Verification code sent on {formData?.email} mail
            </Typography>
            <br />
            <TextField name="otp" style={{ "width": '80%' }} label="Enter Verification Code" type="text" variant="outlined" onChange={(event) => setOtp(event.target.value)} />
            <div className="row">
              <div className="d-flex justify-content-center">
                <Button
                  onClick={() => verifyCode(formData?.email)}
                  variant="contained"
                  class="btn btn-outline-success"
                  // type="submit"
                  style={{ 'width': '50%', 'margin': '5%' }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Form
            formData={formData}
            schema={schema}
            uiSchema={uiSchema}
            ObjectFieldTemplate={ObjectFieldTemplate}
            onSubmit={handleSubmit}
            onChange={handleChange}
            widgets={widgets}
            // onError={onError}
            validate={validatePasswordMatch}
            noHtml5Validate
            liveValidate={validateForm}
            transformErrors={transformErrors}
          >
            <div className="row">
              <div className="d-flex justify-content-center">
                <Button
                  onClick={() => setValidateForm(true)}
                  variant="contained"
                  class="btn btn-outline-success"
                  type="submit"
                  style={{ 'width': '50%', 'margin': '5%' }}
                >
                  {form === 'registration' ? 'Register' : 'Login'}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </div>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default EnrollForm;
