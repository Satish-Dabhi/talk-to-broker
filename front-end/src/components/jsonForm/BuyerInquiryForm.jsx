import { Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import { withTheme } from '@rjsf/core';
import { Theme5 as Mui5Theme } from '@rjsf/material-ui';
import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateSnackBar } from '../../redux/common/snackBarSlice';
import { createProperty } from '../../redux/property/propertySlice';
import {
    ADD_BUYER_INQUIRY_FORMS,
  ADD_PROPERTY_FORMS,
  allDefined,
  findPercentageValue,
  getLocalStorageObject,
  getSchemaFieldTitle,
  getSessionStorageObject,
  getSum,
  removeSessionStorageObject,
  setSessionStorageObject,
} from '../../services/utils';
import * as constant from '../../services/utils/constant';
import ObjectFieldTemplate from '../ObjectFieldTemplate';
import DynamicFieldsWidget from '../customWidgets/DynamicFields';
import FileWidget from '../customWidgets/FileWidget';
import InputAdornmentFieldWidget from '../customWidgets/InputAdornmentField';
import RadioWidget from '../customWidgets/RadioWidget';
import SliderFieldsWidget from '../customWidgets/SliderRange';
import WidthLengthFieldWidget from '../customWidgets/WidthLengthField';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import MoodIcon from '@mui/icons-material/Mood';

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

const BuyerInquiryForm = (props) => {
  const { schema, uiSchema, activeForm, setActiveForm, setPropertyType } = props;
  const { addProperty } = useSelector((state) => state.propertyHandler);
  const [sessionFormData, setSessionFormData] = useState({});
  const [validateForm, setValidateForm] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [formSaved, setFormSaved] = useState(false);
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLocalStorageObject('token');
    const loggedInUser =
      user && CryptoJS.AES.decrypt(user, constant.LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(loggedInUser);
    userData && setUserId(userData?.user?.id);
  }, []);

  useEffect(() => {
    var session_data = getSessionStorageObject(constant.PROPERTY_SESSION_KEY);
    const decrypted =
      session_data &&
      CryptoJS.AES.decrypt(session_data, constant.SESSION_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    session_data && setSessionFormData(JSON.parse(decrypted));
  }, [activeForm]);

  const handleSubmit = ({ formData }) => {
    console.log(".............", formData);
    // formData.addPropertyType && setPropertyType(formData.addPropertyType);
    // const encrypted = CryptoJS.AES.encrypt(JSON.stringify(formData), constant.SESSION_OBJECT_SECRET_KEY).toString();
    // setSessionStorageObject(constant.PROPERTY_SESSION_KEY, encrypted);
    // setValidateForm(false);
    // if (userId !== '' && formSubmit) {
    //   const finalFormData = { ...formData, u_id: userId };
    //   dispatch(createProperty(finalFormData));
    //   removeSessionStorageObject(constant.PROPERTY_SESSION_KEY);
    //   setFormSaved(true);
    // }
    ADD_PROPERTY_FORMS.length - 1 > activeForm && setActiveForm(activeForm + 1);
    setFormSubmit(false);
  };

  const handleChange = ({ formData: newFormData }) => {
    console.log("handle-change",newFormData);
    };

  const widgets = {
  };

  const handleBackButtonClick = () => {
    setActiveForm(activeForm - 1);
  };

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

  const handleNextButtonClick = () => {
    setValidateForm(true);
  };

  const handleSubmitButtonClick = () => {
    setValidateForm(true);
    setFormSubmit(true);
  };

  const TitleField = ({ title }) => (
    <div className="form-title">
      {title}
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Form
        fields={{ TitleField }}
        formData={sessionFormData}
        schema={schema}
        uiSchema={uiSchema}
        ObjectFieldTemplate={ObjectFieldTemplate}
        onSubmit={handleSubmit}
        onChange={handleChange}
        widgets={widgets}
        noHtml5Validate
        liveValidate={validateForm}
        transformErrors={transformErrors}
      >
        <div className="row">
          {activeForm !== 0 && (
            <div className="col-md-6 d-flex justify-content-center">
              <Button variant="contained" color="info" startIcon={<SkipPreviousIcon />} type="button" onClick={handleBackButtonClick} className='w-100'>
                Back
              </Button>
            </div>
          )}
          {activeForm === ADD_BUYER_INQUIRY_FORMS.length - 1 ? (
            <div className="col-md-6 d-flex justify-content-center">
              <Button color="success" variant="contained" endIcon={<MoodIcon />} type="submit" onClick={handleSubmitButtonClick} className='w-100 btn btn-outline-success'>
                Submit
              </Button>
            </div>
          ) : (
            <div className="col-md-6 d-flex justify-content-center">
              <Button color="success" variant="contained" endIcon={<SkipNextIcon />} type="submit" onClick={handleNextButtonClick} className='w-100 btn btn-outline-success'>
                Next
              </Button>
            </div>
          )}
        </div>
      </Form>
    </ThemeProvider>
  );
};

export default BuyerInquiryForm;
