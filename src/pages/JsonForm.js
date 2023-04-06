import React from "react";
import { withTheme } from '@rjsf/core';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import ObjectFieldTemplate from "../components/ObjectFieldTemplate";
import { Button } from "@material-ui/core";
import { Theme5 as Mui5Theme } from '@rjsf/material-ui';


const theme = createTheme({
    components: {
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
      },
    },
  });

const Form = withTheme(Mui5Theme);

const JsonForm = (props) => {
    // const {schema, uiSchema} = form;
    console.log("json form", props);
    const { schema, uiSchema, onFormSubmit, activeForm } = props;
    const handleSubmit = ({ formData }) => {
        console.log("....", formData);
        onFormSubmit(activeForm + 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <Form
                schema={schema}
                uiSchema={uiSchema}
                ObjectFieldTemplate={ObjectFieldTemplate}
                onSubmit={handleSubmit}
            >
                <div className="text-center mt-5">
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </ThemeProvider>
    );
};

export default JsonForm;
