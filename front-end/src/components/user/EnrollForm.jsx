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
import { createUser, getUserByEmail, updateUser, verifyCode, verifyOtp } from '../../redux/user/userSlice';
import { Alert } from '@mui/material';
import verificationFormSchema from '../../formsDefinitions/verificationForm/schema.json';
import verificationFormUiSchema from '../../formsDefinitions/verificationForm/uiSchema.json';
import { updateSnackBar } from '../../redux/common/snackBarSlice';

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
  const { schema, uiSchema, form, verifyForm, handleClose } = props;
  const [currentForm, setCurrentForm] = useState({
    schema: schema,
    uiSchema: uiSchema,
    formType: form,
  });
  const [userEmail, setUserEmail] = useState('');
  const [formData, setFormData] = useState({});
  // const [showOTP, setShowOTP] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [validateForm, setValidateForm] = useState(false);
  const { addUser, userByEmail, verifyOtp, updatedUser } = useSelector((store) => store.userHandler);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("verifyOtp", verifyOtp?.verify);
    if (verifyOtp?.verify === true) {
      setSnackbar({
        open: true,
        message: 'Your account created successfully',
        severity: 'success',
      });
      handleClose();
    } else if (verifyOtp?.verify === false) {
      setSnackbar({
        open: true,
        message: 'This verification code is not valid',
        severity: 'error',
      });
    }
  }, [verifyOtp]);

  useEffect(() => {
    if (currentForm.formType === 'registration') {
      if (addUser?.status === 'created') {
        verifyForm(true);
        setCurrentForm({
          schema: verificationFormSchema,
          uiSchema: verificationFormUiSchema,
          formType: 'verification',
        });
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

  // useEffect(() => {
  //   if (userByEmail?.data && userByEmail?.data.length > 0) {
  //     const { otpCreateTime, otp } = userByEmail?.data[0];
  //     console.log('otpCreateTime', otpCreateTime);
  //     console.log('otp', otp);
  //     const mailOptions = {
  //       from: 'babyboss65166516@gmail.com',
  //       to: formData.email,
  //       subject: 'Welcome',
  //       emailBody: `Your Otp is ${otp}`,
  //     };
  //     dispatch(sendEmail(mailOptions));
  //     setSnackbar({
  //       open: true,
  //       message: 'Verification code sent',
  //       severity: 'success',
  //     });
  //     if (isWithinMinutes(otpCreateTime, 1)) {
  //       if (formData.otp === otp) {
  //         setSnackbar({
  //           open: true,
  //           message: 'Verified',
  //           severity: 'success',
  //         });
  //         const updateUserData = {
  //           verified: true,
  //           email: formData.email,
  //         };
  //         dispatch(updateUser(updateUserData));
  //       } else {
  //         setSnackbar({
  //           open: true,
  //           message: 'Please Enter valid verification code',
  //           severity: 'error',
  //         });
  //       }
  //     } else {
  //       setSnackbar({
  //         open: true,
  //         message: 'Your verification code is not valid',
  //         severity: 'error',
  //       });
  //     }
  //   }
  // }, [userByEmail]);

  // useEffect(() => {
  //   if (
  //     currentForm.formType === 'registration' &&
  //     Object.keys(formData).length !== 0 &&
  //     updatedUser?.status === 'done'
  //   ) {
  //     const mailOptions = {
  //       from: 'babyboss65166516@gmail.com',
  //       to: formData.email,
  //       subject: 'Welcome',
  //       emailBody: `Your Otp is ${generatedOtp}`,
  //     };
  //     dispatch(sendEmail(mailOptions));
  //     setSnackbar({
  //       open: true,
  //       message: 'Verification code sent',
  //       severity: 'success',
  //     });
  //   }
  // }, [updatedUser]);

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
    if (currentForm.formType === 'registration') {
      const otp = generateOTP();
      setGeneratedOtp(otp);
      setUserEmail(formData.email);
      const userData = {
        email: formData.email,
        iAm: formData.iAm,
        name: formData.name,
        password: formData.password,
      };
      dispatch(createUser(userData));
    } else if (currentForm.formType === 'login') {
      dispatch(
        updateSnackBar({
          open: true,
          message: 'it works',
          severity: 'error',
        })
      )
    } else {
      const verifiedData = {
        email: userEmail,
        otp: formData.otp
      }
      dispatch(verifyCode(verifiedData));
    }
  };

  const validatePasswordMatch = (formData, errors) => {
    if (currentForm.formType === 'registration') {
      const { password, rePassword } = formData;
      if (password !== rePassword) {
        errors.rePassword.addError('Password and Re-Password should be same');
      }
    }
    return errors;
  };

  const handleChange = ({ formData }) => {
    setFormData(formData);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const widgets = {
    radio: RadioWidget,
  };

  const resendVerificationCode = () => {
    // const otp = generateOTP();
    // setGeneratedOtp(otp);
    // const userData = {
    //   email: userEmail,
    //   otpCreateTime: new Date(),
    //   otp: otp,
    // };
    // dispatch(updateUser(userData));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="enroll-modal">
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
          {currentForm.formType === 'verification' && (
            <a href="#" onClick={() => resendVerificationCode()}>
              Resend Verification code
            </a>
          )}
          <div className="row">
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => setValidateForm(true)}
                variant="contained"
                class="btn btn-outline-success"
                type="submit"
                style={{ width: '50%', margin: '5%' }}
              >
                {currentForm.formType === 'registration'
                  ? 'Register'
                  : currentForm.formType === 'login'
                    ? 'Login'
                    : 'Verify'}
              </Button>
            </div>
          </div>
        </Form>
        {/* )} */}
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
