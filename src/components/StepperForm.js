import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import VerticalLinearStepper from "./VerticalLinearStepper";
import basicInfoSchema from "../formsDefinitions/BasicInfo/schema.json";
import basicInfoUiSchema from "../formsDefinitions/BasicInfo/uiSchema.json";
import JsonForm from "../pages/JsonForm";

function StepperForm() {
    const [activeForm, setActiveForm] = useState(0);
    const [form, setForm] = useState({});

    useEffect(() => {
        const getSchemaUiSchema = () => {
            switch (activeForm) {
                case 0:
                        return {
                            schema: basicInfoSchema,
                            uiSchema: basicInfoUiSchema,
                        };
                default:
                    return {
                        schema: "dfsdf",
                        uiSchema: "fsdfsd",
                    };
            }
        };
        setForm(getSchemaUiSchema);
    }, [activeForm]);

    return (
        <Grid container className="mt-5">
            <Grid item xs={4}>
                <VerticalLinearStepper />
            </Grid>
            <Grid item xs={8} className="ttb-form">
                {Object.keys(form).length > 0 && 
                <JsonForm 
                schema={form.schema} 
                uiSchema={form.uiSchema}
                activeForm={activeForm}
                onFormSubmit={setActiveForm}
                >
                </JsonForm>}
            </Grid>
        </Grid>
    );
}

export default StepperForm;
