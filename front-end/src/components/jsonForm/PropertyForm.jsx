import MoodIcon from '@mui/icons-material/Mood';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
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
  ADD_PROPERTY_FORMS,
  allDefined,
  convertLandArea,
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

const PropertyForm = (props) => {
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
    if (addProperty?.status && formSaved) {
      dispatch(
        updateSnackBar({
          open: true,
          message: addProperty?.message,
          severity: 'success',
        })
      );
      setFormSaved(false);
      navigate('/user/profile');
    }
  }, [addProperty]);

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
    formData.addPropertyType && setPropertyType(formData.addPropertyType);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(formData), constant.SESSION_OBJECT_SECRET_KEY).toString();
    setSessionStorageObject(constant.PROPERTY_SESSION_KEY, encrypted);
    setValidateForm(false);
    if (userId !== '' && formSubmit) {
      const finalFormData = { ...formData, u_id: userId };
      dispatch(createProperty(finalFormData));
      removeSessionStorageObject(constant.PROPERTY_SESSION_KEY);
      setFormSaved(true);
    }
    ADD_PROPERTY_FORMS.length - 1 > activeForm && setActiveForm(activeForm + 1);
    setFormSubmit(false);
  };

  const handleChange = ({ formData: newFormData }) => {

    console.log("newFormDatanewFormDatanewFormData",newFormData);
    const {
      constructionPropertyTerraceArea,
      constructionPropertyBalconyArea,
      constructionPropertyLowerFloorCarpet,
      constructionPropertyUpperFloorCarpet,
      newPropertyPerSqFeetPrice,
      newPropertyArea,
      newPropertyExtraArea,
      agriculturalSellPropertyDetails,
      decidedSalesValueOfProperty,
      registrationFeePercentage,
      stampsDutyFeePercentage,
      GSTDetails,
      constructionDetails,
      bifurcationOfArea,
      measurementUnits,
      agriculturalConvertAreaUnits,
      totalAgriculturalArea,
      salesRatePerUnit,
      agriculturalTotalPrice
    } = newFormData;

    let sumOfFields = 0;
    let sumOfConstructionDetails = 0;
    let sumOfBifurcationOfArea = 0;
    let newPropertyBasicPrice = 0;
    let newTotalExtraAreaValue = 0;
    let totalValue = 0;
    let totalSellPropertyValue = 0;
    let registrationFees = 0;
    let stampsDutyFees = 0;
    let grossAmount = 0;
    let GSTTax = 0;
    let agriculturalLandArea = 0;
    let updatedAgriculturalTotalPrice = 1;

    //update land area by units
    if (
      allDefined(
        totalAgriculturalArea,
        measurementUnits,
        agriculturalConvertAreaUnits
      )
    ) {
      agriculturalLandArea = convertLandArea(totalAgriculturalArea, measurementUnits, agriculturalConvertAreaUnits);
    }

    //update land area by units
    if (
      allDefined(
        salesRatePerUnit,
        agriculturalLandArea
      )
    ) {
      updatedAgriculturalTotalPrice = salesRatePerUnit * agriculturalLandArea;
    }


    //update sumOfBifurcationOfArea total
    if (
      allDefined(
        bifurcationOfArea?.reraCarpet ?? 0,
        bifurcationOfArea?.balcony ?? 0,
        bifurcationOfArea?.terrace ?? 0,
        bifurcationOfArea?.washArea ?? 0,
      )
    ) {
      sumOfBifurcationOfArea = getSum(
        bifurcationOfArea?.reraCarpet ?? 0,
        bifurcationOfArea?.balcony ?? 0,
        bifurcationOfArea?.terrace ?? 0,
        bifurcationOfArea?.washArea ?? 0,
      );
    }

    //update construction details total
    if (
      allDefined(
        constructionDetails?.groundFloor ?? 0,
        constructionDetails?.firstFloor ?? 0,
        constructionDetails?.secondFloor ?? 0,
        constructionDetails?.thirdFloor ?? 0,
        constructionDetails?.fourthFloor ?? 0
      )
    ) {
      sumOfConstructionDetails = getSum(
        constructionDetails?.groundFloor ?? 0,
        constructionDetails?.firstFloor ?? 0,
        constructionDetails?.secondFloor ?? 0,
        constructionDetails?.thirdFloor ?? 0,
        constructionDetails?.fourthFloor ?? 0
      );
    }

    //update property sum value
    if (
      allDefined(
        constructionPropertyTerraceArea,
        constructionPropertyBalconyArea,
        constructionPropertyLowerFloorCarpet ?? 0,
        constructionPropertyUpperFloorCarpet ?? 0
      )
    ) {
      sumOfFields = getSum(
        constructionPropertyTerraceArea,
        constructionPropertyBalconyArea,
        constructionPropertyLowerFloorCarpet ?? 0,
        constructionPropertyUpperFloorCarpet ?? 0
      );
    }

    //update new extra property value
    if (
      newPropertyExtraArea &&
      allDefined(
        newPropertyExtraArea.extraArea,
        newPropertyExtraArea.priceRate,
        newPropertyPerSqFeetPrice,
        newPropertyArea
      )
    ) {
      // update total extra property price
      if (newPropertyExtraArea) {
        newTotalExtraAreaValue = newPropertyExtraArea.extraArea * newPropertyExtraArea.priceRate;
      }

      //update new basic price
      newPropertyBasicPrice = newPropertyPerSqFeetPrice * newPropertyArea;
    }

    //update agricultural sell property value
    if (
      agriculturalSellPropertyDetails &&
      allDefined(agriculturalSellPropertyDetails.totalArea, agriculturalSellPropertyDetails.unitPrice)
    ) {
      if (agriculturalSellPropertyDetails) {
        const { totalArea, unitPrice } = agriculturalSellPropertyDetails;
        totalValue = totalArea * unitPrice;
      }
    }

    //regestration fee calculation
    if (allDefined(decidedSalesValueOfProperty, registrationFeePercentage)) {
      registrationFees = findPercentageValue(decidedSalesValueOfProperty, registrationFeePercentage);
    }

    //stamp duty calculation
    if (allDefined(decidedSalesValueOfProperty, stampsDutyFeePercentage)) {
      stampsDutyFees = findPercentageValue(decidedSalesValueOfProperty, stampsDutyFeePercentage);
    }

    // GST calculation
    if (GSTDetails && allDefined(GSTDetails.decidedGSTSalesValue, GSTDetails.GSTPercentage)) {
      GSTTax = findPercentageValue(GSTDetails.decidedGSTSalesValue, GSTDetails.GSTPercentage);
    }

    //Gross amount calculation
    if (allDefined(registrationFees, stampsDutyFees)) {
      grossAmount = getSum(registrationFees, stampsDutyFees);
    }

    //update total sell property value
    if (
      newPropertyExtraArea &&
      allDefined(newPropertyExtraArea.totalExtraAreaValue, newPropertyBasicPrice)
    ) {
      totalSellPropertyValue = newPropertyBasicPrice + newTotalExtraAreaValue;
    }

    const updatedFormData = {
      ...newFormData,
      agriculturalTotalPrice: updatedAgriculturalTotalPrice,  
      agriculturalConvertedArea: agriculturalLandArea,
      constructionPropertyTotalCarpet: sumOfFields,
      newPropertyBasicPrice: newPropertyBasicPrice,
      bifurcationOfArea: {
        ...bifurcationOfArea,
        totalArea: sumOfBifurcationOfArea
      },
      constructionDetails: {
        ...constructionDetails,
        totalConstruction: sumOfConstructionDetails
      },
      newPropertyExtraArea: {
        ...newPropertyExtraArea,
        totalExtraAreaValue: newTotalExtraAreaValue,
      },
      agriculturalSellPropertyDetails: {
        ...agriculturalSellPropertyDetails,
        totalValue: totalValue,
      },
      totalSellPropertyValue: totalSellPropertyValue,
      registrationFees: registrationFees,
      stampsDutyFees: stampsDutyFees,
      grossAmount: grossAmount,
      GSTDetails: {
        ...GSTDetails,
        GSTTax: GSTTax,
      },
    };

    setSessionFormData(updatedFormData);
  };

  const widgets = {
    radio: RadioWidget,
    dynamicFields: DynamicFieldsWidget,
    WidthLengthField: WidthLengthFieldWidget,
    sliderField: SliderFieldsWidget,
    iconField: InputAdornmentFieldWidget,
    FileWidget: FileWidget,
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
          {activeForm === ADD_PROPERTY_FORMS.length - 1 ? (
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

export default PropertyForm;
