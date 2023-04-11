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

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: constant.FORM_VARIANT,
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

    useEffect(() => {
        console.log("sessionFormData",sessionFormData);
        const sum = findSum(
            sessionFormData.constructionPropertyArea,
            sessionFormData.constructionPropertyTerraceArea
        );
        setSessionFormData({
          ...sessionFormData,
          constructionPropertyTotalCarpet: sum
        });
      }, [sessionFormData.constructionPropertyArea, sessionFormData.constructionPropertyTerraceArea]);

    const handleSubmit = ({ formData }) => {
        setActiveForm(activeForm + 1);
        formData.addPropertyType && setPropertyType(formData.addPropertyType);
        setSessionStorageObject(constant.SESSION_KEY, JSON.stringify(formData));
    };

    const handleChange = ({ formData }) => {
        console.log("formDAta", formData);
        // formData.constructionPropertyTotalCarpet = findSum(
        //     formData.constructionPropertyArea,
        //     formData.constructionPropertyTerraceArea
        // );
        // console.log("sumsum", sum);
        // return { ...formData, constructionPropertyTotalCarpet: sum };
        // formData.constructionPropertyTotalCarpet =
        //     formData.constructionPropertyArea + formData.constructionPropertyTerraceArea;
        // +
        //     formData.constructionPropertyLowerFloorCarpet &&
        // formData.constructionPropertyLowerFloorCarpet +
        //     formData.constructionPropertyUpperFloorCarpet &&
        // formData.constructionPropertyUpperFloorCarpet;
        console.log(
            "formData.constructionPropertyTotalCarpet",
            formData.constructionPropertyTotalCarpet
        );
    };

    const widgets = {
        radio: RadioWidget,
        DynamicFields: DynamicFieldsWidget,
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
