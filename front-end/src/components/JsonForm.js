import { Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import { withTheme } from '@rjsf/core';
import { Theme5 as Mui5Theme } from '@rjsf/material-ui';
import CryptoJS from 'crypto-js';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProperty } from '../redux/property/propertySlice';
import {
  ADD_PROPERTY_FORMS,
  allDefined,
  findPercentageValue,
  getSchemaFieldTitle,
  getSessionStorageObject,
  getSum,
  setSessionStorageObject,
} from '../services/utils';
import * as constant from '../services/utils/constant';
import ObjectFieldTemplate from './ObjectFieldTemplate';
import DynamicFieldsWidget from './customWidgets/DynamicFields';
import InputAdornmentFieldWidget from './customWidgets/InputAdornmentField';
import RadioWidget from './customWidgets/RadioWidget';
import SliderFieldsWidget from './customWidgets/SliderRange';
import WidthLengthFieldWidget from './customWidgets/WidthLengthField';


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

const JsonForm = (props) => {
  const { schema, uiSchema, activeForm, setActiveForm, setPropertyType } = props;
  const [sessionFormData, setSessionFormData] = useState({});
  const [validateForm, setValidateForm] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    var session_data = getSessionStorageObject(constant.SESSION_KEY);
    const decrypted = session_data && CryptoJS.AES.decrypt(session_data, constant.SESSION_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    session_data && setSessionFormData(JSON.parse(decrypted));
  }, [activeForm]);

  const handleSubmit = ({ formData }) => {
    formData.addPropertyType && setPropertyType(formData.addPropertyType);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(formData), constant.SESSION_OBJECT_SECRET_KEY).toString();
    setSessionStorageObject(constant.SESSION_KEY, encrypted);
    setValidateForm(false);
    formSubmit && dispatch(createProperty(formData));
    ADD_PROPERTY_FORMS.length - 1 > activeForm && setActiveForm(activeForm + 1);
    setFormSubmit(false);
  };

  const handleChange = ({ formData: newFormData }) => {
    const {
      constructionPropertyTerraceArea,
      constructionPropertyBalconyArea,
      constructionPropertyLowerFloorCarpet,
      constructionPropertyUpperFloorCarpet,
      developerPropertyPerSqFeetPrice,
      developerPropertyArea,
      developerPropertyExtraArea,
      agriculturalSellPropertyDetails,
      decidedSalesValueOfProperty,
      registrationFeePercentage,
      stampsDutyFeePercentage,
      GSTDetails,
    } = newFormData;

    let sumOfFields = 0;
    let developerPropertyBasicPrice = 0;
    let newTotalExtraAreaValue = 0;
    let totalValue = 0;
    let totalSellPropertyValue = 0;
    let registrationFees = 0;
    let stampsDutyFees = 0;
    let grossAmount = 0;
    let GSTTax = 0;

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

    //update developer extra property value
    if (
      developerPropertyExtraArea &&
      allDefined(
        developerPropertyExtraArea.extraArea,
        developerPropertyExtraArea.priceRate,
        developerPropertyPerSqFeetPrice,
        developerPropertyArea
      )
    ) {
      // update total extra property price
      if (developerPropertyExtraArea) {
        newTotalExtraAreaValue = developerPropertyExtraArea.extraArea * developerPropertyExtraArea.priceRate;
      }

      //update developer basic price
      developerPropertyBasicPrice = developerPropertyPerSqFeetPrice * developerPropertyArea;
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
      developerPropertyExtraArea &&
      allDefined(developerPropertyExtraArea.totalExtraAreaValue, developerPropertyBasicPrice)
    ) {
      totalSellPropertyValue = developerPropertyBasicPrice + newTotalExtraAreaValue;
    }
    const updatedFormData = {
      ...newFormData,
      constructionPropertyTotalCarpet: sumOfFields,
      developerPropertyBasicPrice: developerPropertyBasicPrice,
      developerPropertyExtraArea: {
        ...developerPropertyExtraArea,
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
  };

  const onError = (errors) => {
    // console.log("Validation errors:", errors);
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

  return (
    <ThemeProvider theme={theme}>
      <Form
        formData={sessionFormData}
        schema={schema}
        uiSchema={uiSchema}
        ObjectFieldTemplate={ObjectFieldTemplate}
        onSubmit={handleSubmit}
        onChange={handleChange}
        widgets={widgets}
        onError={onError}
        noHtml5Validate
        liveValidate={validateForm}
        transformErrors={transformErrors}
      >
        <div className="row">
          {activeForm !== 0 && (
            <div className="col-md-6 d-flex justify-content-center">
              <Button onClick={handleBackButtonClick} variant="contained" class="btn btn-outline-success" type="button">
                Back
              </Button>
            </div>
          )}
          {activeForm === ADD_PROPERTY_FORMS.length - 1 ? (
            <div className="col-md-6 d-flex justify-content-center">
              <Button
                onClick={handleSubmitButtonClick}
                variant="contained"
                class="btn btn-outline-success"
                type="submit"
              >
                Submit
              </Button>
            </div>
          ) : (
            <div className="col-md-6 d-flex justify-content-center">
              <Button onClick={handleNextButtonClick} variant="contained" class="btn btn-outline-success" type="submit">
                Next
              </Button>
            </div>
          )}
        </div>
      </Form>
    </ThemeProvider>
  );
};

export default JsonForm;
