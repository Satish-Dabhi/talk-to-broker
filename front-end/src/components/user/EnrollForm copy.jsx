import { Button, Snackbar, TextField, Typography } from '@material-ui/core';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import { withTheme } from '@rjsf/core';
import { Theme5 as Mui5Theme } from '@rjsf/material-ui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as constant from '../../services/utils/constant';
import ObjectFieldTemplate from '../ObjectFieldTemplate';
import { generateOTP, getSchemaFieldTitle, isWithinMinutes } from '../../services/utils';
import RadioWidget from '../customWidgets/RadioWidget';
import { sendEmail } from '../../redux/email/emailSlice';
import { createUser, getUserByEmail, updateUser } from '../../redux/user/userSlice';
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

const EnrollForm = (props) => {
  const { schema, uiSchema, form, verifyForm } = props;
  const [currentForm, setCurrentForm] = useState({
    schema: schema,
    uiSchema: uiSchema,
  });
  const [formData, setFormData] = useState({});
  const [showOTP, setShowOTP] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [validateForm, setValidateForm] = useState(false);
  const { addUser, userByEmail, userByEmailLoader, updatedUser } = useSelector((store) => store.userHandler);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('foformformformformrm', form);
  //   setVerifiedOtp('');
  //   setGeneratedOtp('');
  // }, [form]);

  useEffect(() => {
    if (form === 'registration' && Object.keys(formData).length !== 0) {
      if (addUser?.status === 'created') {
        const mailOptions = {
          from: 'babyboss65166516@gmail.com',
          to: formData.email,
          subject: 'Welcome',
          emailBody: `Your Otp is ${generatedOtp}`,
        };
        // dispatch(sendEmail(mailOptions));
        verifyForm(true);
        setShowOTP(true);
        setSnackbar({
          open: true,
          message: 'Verification code sent',
          severity: 'success',
        });
      } else if (addUser?.status === 'exist') {
        setSnackbar({
          open: true,
          message: 'This email address is already exist',
          severity: 'error',
        });
      }
    }
  }, [addUser]);

  useEffect(() => {
    console.log('gfj@mail.com..................................', updatedUser);
    if (form === 'registration' && Object.keys(formData).length !== 0 && updatedUser?.status === 'done') {
      const mailOptions = {
        from: 'babyboss65166516@gmail.com',
        to: formData.email,
        subject: 'Welcome',
        emailBody: `Your Otp is ${generatedOtp}`,
      };
      dispatch(sendEmail(mailOptions));
      setSnackbar({
        open: true,
        message: 'Verification code sent',
        severity: 'success',
      });
    }
  }, [updatedUser]);

  console.log('useraddUserByEmail', addUser);
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
    if (form === 'registration') {
      const otp = generateOTP();
      setGeneratedOtp(otp);
      const userData = {
        email: formData.email,
        iAm: formData.iAm,
        name: formData.name,
        password: formData.password,
        otpCreateTime: new Date(),
        otp: otp,
      };
      dispatch(createUser(userData));
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

  useEffect(() => {
    console.log('userByEmail65656565656', userByEmail);
    if (userByEmail?.data && userByEmail?.data.length > 0) {
      const { otpCreateTime, otp } = userByEmail?.data[0];
      console.log('otpCreateTime', otpCreateTime);
      console.log('otp', otp);
      if (isWithinMinutes(otpCreateTime, 1)) {
        if (verifiedOtp === otp) {
          setSnackbar({
            open: true,
            message: 'Verified',
            severity: 'success',
          });
          const updateUserData = {
            verified: true,
            email: formData.email,
          };
          dispatch(updateUser(updateUserData));
        } else {
          setSnackbar({
            open: true,
            message: 'Please Enter valid verification code',
            severity: 'error',
          });
        }
      } else {
        setSnackbar({
          open: true,
          message: 'Your verification code is not valid',
          severity: 'error',
        });
      }
    }
  }, [userByEmail]);

  const verifyCode = (email) => {
    dispatch(getUserByEmail(email));
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const widgets = {
    radio: RadioWidget,
  };

  const resendVerificationCode = (email) => {
    const otp = generateOTP();
    setGeneratedOtp(otp);
    const userData = {
      email: formData.email,
      otpCreateTime: new Date(),
      otp: otp,
    };
    dispatch(updateUser(userData));
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
            <TextField
              name="otp"
              style={{ width: '80%' }}
              label="Enter Verification Code"
              type="text"
              variant="outlined"
              onChange={(event) => setVerifiedOtp(event.target.value)}
            />
            <br />
            <a href="#" onClick={() => resendVerificationCode(formData?.email)}>
              Resend Verification code
            </a>
            <div className="row">
              <div className="d-flex justify-content-center">
                <Button
                  onClick={() => verifyCode(formData?.email)}
                  variant="contained"
                  class="btn btn-outline-success"
                  // type="submit"
                  style={{ width: '50%', margin: '5%' }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Form
            formData={formData}
            schema={currentForm.schema}
            uiSchema={currentForm.uiSchema}
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
                  style={{ width: '50%', margin: '5%' }}
                >
                  {form === 'registration' ? 'Register' : 'Login'}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default EnrollForm;
