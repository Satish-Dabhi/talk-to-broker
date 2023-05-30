import { Button, TextField, Typography } from '@material-ui/core';
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
import { createUser } from '../../redux/user/userSlice';

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
  const [validateForm, setValidateForm] = useState(false);
  const { addUser } = useSelector((store) => store.userHandler);
  const dispatch = useDispatch();

  console.log('addUser', addUser);

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

      dispatch(createUser(userData));

      const mailOptions = {
        from: 'babyboss65166516@gmail.com',
        to: formData.email,
        subject: 'Welcome',
        emailBody: `Your Otp is ${otp}`,
      };
      // dispatch(sendEmail(mailOptions));
      setShowOTP(true);
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

  const widgets = {
    radio: RadioWidget,
  };

  return (
    <ThemeProvider theme={theme}>
      {showOTP ? (
        <>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Check your {formData?.email} mail for the OTP:
          </Typography>
          <TextField name="otp" label="Enter OTP" type="text" variant="outlined" onChange={(event) => setOtp(event.target.value)} />
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
            <div className="col-md-6 d-flex justify-content-center">
              <Button
                onClick={() => setValidateForm(true)}
                variant="contained"
                class="btn btn-outline-success"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      )}
    </ThemeProvider>
  );
};

export default EnrollForm;
