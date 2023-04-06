import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import VerticalLinearStepper from "./VerticalLinearStepper";
import basicInfoSchema from "../formsDefinitions/BasicInfo/schema.json";
import basicInfoUiSchema from "../formsDefinitions/BasicInfo/uiSchema.json";
import developerPropertyDetailSchema from "../formsDefinitions/developerPropertyDetail/schema.json";
import developerPropertyDetailUiSchema from "../formsDefinitions/developerPropertyDetail/uiSchema.json";
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
                case 1:
                    return {
                        schema: developerPropertyDetailSchema,
                        uiSchema: developerPropertyDetailUiSchema,
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
                <VerticalLinearStepper activeForm={activeForm} setActiveForm={setActiveForm}/>
            </Grid>
            <Grid item xs={8} className="ttb-form">
                {Object.keys(form).length > 0 && (
                    <JsonForm
                        schema={form.schema}
                        uiSchema={form.uiSchema}
                        activeForm={activeForm}
                        setActiveForm={setActiveForm}
                    ></JsonForm>
                )}
            </Grid>
        </Grid>
    );
}

export default StepperForm;
