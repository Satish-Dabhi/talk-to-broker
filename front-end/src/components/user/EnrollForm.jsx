import { Button } from '@material-ui/core';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import { withTheme } from '@rjsf/core';
import { Theme5 as Mui5Theme } from '@rjsf/material-ui';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as constant from '../../services/utils/constant';
import ObjectFieldTemplate from '../ObjectFieldTemplate';
import { getSchemaFieldTitle } from '../../services/utils';
import RadioWidget from '../customWidgets/RadioWidget';


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

const EnrollForm = (props) => {
    const { schema, uiSchema } = props;
    const [formData, setFormData] = useState({});
    const [validateForm, setValidateForm] = useState(false);

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
        console.log("formData", formData);
    };

    const handleChange = ({ formData }) => {
        console.log("formData", formData);
    };

    const handleNextButtonClick = () => {
        setValidateForm(true);
    };

    const widgets = {
        radio: RadioWidget,
      };

    return (
        <ThemeProvider theme={theme}>
            <Form
                formData={formData}
                schema={schema}
                uiSchema={uiSchema}
                ObjectFieldTemplate={ObjectFieldTemplate}
                onSubmit={handleSubmit}
                onChange={handleChange}
                widgets={widgets}
                // onError={onError}
                noHtml5Validate
                liveValidate={validateForm}
                transformErrors={transformErrors}
            >
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center">
                        <Button
                            onClick={handleNextButtonClick}
                            variant="contained"
                            class="btn btn-outline-success"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>
        </ThemeProvider>
    );
}

export default EnrollForm