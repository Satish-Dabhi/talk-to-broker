import { Button } from "@material-ui/core";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { withTheme } from "@rjsf/core";
import { Theme5 as Mui5Theme } from "@rjsf/material-ui";
import React, { useEffect, useState } from "react";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import { findSum, getSessionStorageObject, setSessionStorageObject } from "../services/utils";
import RadioWidget from "./customWidgets/RadioWidget";
import * as constant from "../services/utils/constant";
import DynamicFieldsWidget from "./customWidgets/DynamicFields";
import WidthLengthFieldWidget from "./customWidgets/WidthLengthField";

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
        setSessionStorageObject(constant.SESSION_KEY, JSON.stringify(formData));
    };

    const handleChange = ({ formData: newFormData }) => {
        if (
            newFormData.constructionPropertyTerraceArea != undefined &&
            newFormData.constructionPropertyBalconyArea != undefined &&
            newFormData.constructionPropertyLowerFloorCarpet != undefined &&
            newFormData.constructionPropertyUpperFloorCarpet != undefined
        ) {
            if (newFormData.subPropertyType != "penthouse") {
                newFormData.constructionPropertyLowerFloorCarpet = 0;
                newFormData.constructionPropertyUpperFloorCarpet = 0;
            }
            const sumOfFields = findSum(
                newFormData.constructionPropertyTerraceArea,
                newFormData.constructionPropertyBalconyArea,
                newFormData.constructionPropertyLowerFloorCarpet,
                newFormData.constructionPropertyUpperFloorCarpet
            );
            setSessionFormData({ ...newFormData, constructionPropertyTotalCarpet: sumOfFields });
        }
    };

    const widgets = {
        radio: RadioWidget,
        DynamicFields: DynamicFieldsWidget,
        WidthLengthField : WidthLengthFieldWidget
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
