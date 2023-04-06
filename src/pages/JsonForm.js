import React, { useEffect, useState } from "react";
import { withTheme } from "@rjsf/core";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import ObjectFieldTemplate from "../components/ObjectFieldTemplate";
import { Button } from "@material-ui/core";
import { Theme5 as Mui5Theme } from "@rjsf/material-ui";

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
        },
    },
});

const Form = withTheme(Mui5Theme);

const JsonForm = (props) => {
    const { schema, uiSchema, activeForm, setActiveForm } = props;
    const [sessionFormData, setSessionFormData] = useState({});

    useEffect(() => {
        var sessionData = JSON.parse(sessionStorage.formData);
        sessionData && setSessionFormData(sessionData);
    }, [activeForm]);

    const handleSubmit = ({ formData }) => {
        setActiveForm(activeForm + 1);
        sessionStorage.setItem("formData", JSON.stringify(formData));
    };

    return (
        <ThemeProvider theme={theme}>
            <Form
                formData={sessionFormData}
                schema={schema}
                uiSchema={uiSchema}
                ObjectFieldTemplate={ObjectFieldTemplate}
                onSubmit={handleSubmit}
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
