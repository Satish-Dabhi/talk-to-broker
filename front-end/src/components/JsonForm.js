import { Button } from "@material-ui/core";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { withTheme } from "@rjsf/core";
import { Theme5 as Mui5Theme } from "@rjsf/material-ui";
import React, { useEffect, useState } from "react";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import {
    allDefined,
    findPercentageValue,
    getSum,
    getSessionStorageObject,
    setSessionStorageObject,
} from "../services/utils";
import RadioWidget from "./customWidgets/RadioWidget";
import * as constant from "../services/utils/constant";
import DynamicFieldsWidget from "./customWidgets/DynamicFields";
import WidthLengthFieldWidget from "./customWidgets/WidthLengthField";
import SliderFieldsWidget from "./customWidgets/SliderRange";
import InputAdornmentFieldWidget from "./customWidgets/InputAdornmentField";
import { useDispatch } from "react-redux";
import { createProperty } from "../redux/property/propertySlice";


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
  const dispatch = useDispatch();



    useEffect(() => {
        var session_data = getSessionStorageObject(constant.SESSION_KEY);
        session_data && setSessionFormData(JSON.parse(session_data));
    }, [activeForm]);

    const handleSubmit = ({ formData }) => {
        formData.addPropertyType && setPropertyType(formData.addPropertyType);
        setSessionStorageObject(constant.SESSION_KEY, JSON.stringify(formData));
        setValidateForm(false);
        dispatch(createProperty(formData));
        constant.ADD_PROPERTY_FORMS - 1 > activeForm && setActiveForm(activeForm + 1);
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
            GSTDetails
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
                newTotalExtraAreaValue =
                    developerPropertyExtraArea.extraArea * developerPropertyExtraArea.priceRate;
            }

            //update developer basic price
            developerPropertyBasicPrice = developerPropertyPerSqFeetPrice * developerPropertyArea;
        }

        //update agricultural sell property value
        if (
            agriculturalSellPropertyDetails &&
            allDefined(
                agriculturalSellPropertyDetails.totalArea,
                agriculturalSellPropertyDetails.unitPrice
            )
        ) {
            if (agriculturalSellPropertyDetails) {
                const { totalArea, unitPrice } = agriculturalSellPropertyDetails;
                totalValue = totalArea * unitPrice;
            }
        }

        //regestration fee calculation
        if (
            allDefined(
                decidedSalesValueOfProperty,
                registrationFeePercentage
            )
        ) {
            registrationFees = findPercentageValue(
                decidedSalesValueOfProperty,
                registrationFeePercentage
            );
        }

        //stamp duty calculation
        if (allDefined(
            decidedSalesValueOfProperty,
            stampsDutyFeePercentage)) {
            stampsDutyFees = findPercentageValue(
                decidedSalesValueOfProperty,
                stampsDutyFeePercentage
            );
        }

        // GST calculation
        if (GSTDetails && allDefined(
            GSTDetails.decidedGSTSalesValue,
            GSTDetails.GSTPercentage)) {
            GSTTax = findPercentageValue(
                GSTDetails.decidedGSTSalesValue,
                GSTDetails.GSTPercentage
            );
        }

        //Gross amount calculation
        if (
            allDefined(
                registrationFees,
                stampsDutyFees
            )
        ) {
            grossAmount = getSum(
                registrationFees,
                stampsDutyFees
            );
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
                GSTTax: GSTTax
            }
        };

        setSessionFormData(updatedFormData);
    };


    const widgets = {
        radio: RadioWidget,
        dynamicFields: DynamicFieldsWidget,
        WidthLengthField: WidthLengthFieldWidget,
        sliderField: SliderFieldsWidget,
        iconField: InputAdornmentFieldWidget
    };

    const onError = (errors) => {
        // console.log("Validation errors:", errors);
    };

    const handleBackButtonClick = () => {
        setActiveForm(activeForm - 1);
    }

    const getSchemaFieldTitle = (propertyName) => {
        const newPropertyName = propertyName.replace(/\./g, "");
        const wordsArray = newPropertyName.split(/(?=[A-Z])/);
        const updatedString = wordsArray.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        return updatedString;
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
                    <div className="col-md-6 d-flex justify-content-center">
                        <Button onClick={handleBackButtonClick} variant="contained" class="btn btn-outline-success" type="button">
                            Back
                        </Button>
                    </div>

                    <div className="col-md-6 d-flex justify-content-center">
                        <Button onClick={handleNextButtonClick} variant="contained" class="btn btn-outline-success" type="submit">
                            Next
                        </Button>
                    </div>
                </div>
            </Form>
        </ThemeProvider>
    );
};

export default JsonForm;
