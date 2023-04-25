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
    findSum,
    getSessionStorageObject,
    setSessionStorageObject,
} from "../services/utils";
import RadioWidget from "./customWidgets/RadioWidget";
import * as constant from "../services/utils/constant";
import DynamicFieldsWidget from "./customWidgets/DynamicFields";
import WidthLengthFieldWidget from "./customWidgets/WidthLengthField";
import SliderFieldsWidget from "./customWidgets/SliderRange";
import InputAdornmentFieldWidget from "./customWidgets/InputAdornmentField";

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

    useEffect(() => {
        var session_data = getSessionStorageObject(constant.SESSION_KEY);
        session_data && setSessionFormData(JSON.parse(session_data));
    }, [activeForm]);

    const handleSubmit = ({ formData }) => {
        setActiveForm(activeForm + 1);
        formData.addPropertyType && setPropertyType(formData.addPropertyType);
        console.log("formData", formData);
        setSessionStorageObject(constant.SESSION_KEY, JSON.stringify(formData));
    };

    const handleChange = ({ formData: newFormData }) => {
        const {
            constructionPropertyTerraceArea,
            constructionPropertyBalconyArea,
            constructionPropertyLowerFloorCarpet,
            constructionPropertyUpperFloorCarpet,
            subPropertyType,
            developerPropertyPerSqFeetPrice,
            developerPropertyArea,
            developerPropertyExtraArea,
            agriculturalSellPropertyDetails,
            desidedSalesValueOfProperty,
            regestrationFeePercentage,
            stampsDutyFeePercentage
        } = newFormData;

        let sumOfFields = 0;
        let developerPropertyBasicPrice = 0;
        let newTotalExtraAreaValue = 0;
        let totalValue = 0;
        let totalSellPropertyValue = 0;
        let regestrationFees = 0;
        let stampsDutyFees = 0;

        if (
            allDefined(
                constructionPropertyTerraceArea,
                constructionPropertyBalconyArea,
                constructionPropertyLowerFloorCarpet ?? 0,
                constructionPropertyUpperFloorCarpet ?? 0
            )
        ) {
            //update property sum value
            sumOfFields = findSum(
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

        if (
            allDefined(
                desidedSalesValueOfProperty,
                regestrationFeePercentage
            )
        ) {
            regestrationFees = findPercentageValue(
                desidedSalesValueOfProperty,
                regestrationFeePercentage
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
            regestrationFees:regestrationFees
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
            >
                <div className="text-center mt-5">
                    <Button variant="contained" type="submit">
                        Next
                    </Button>
                </div>
            </Form>
        </ThemeProvider>
    );
};

export default JsonForm;
