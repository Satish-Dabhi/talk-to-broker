import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import JsonForm from "../components/JsonForm";
import * as constant from "../services/utils/constant";
import { getActiveForm } from "../services/utils/getActiveForm";
import VerticalLinearStepper from "../components/VerticalLinearStepper";

function AddProperty() {
    const [activeForm, setActiveForm] = useState(0);
    const [propertyType, setPropertyType] = useState(constant.DEVELOPER_PROPERTY);
    const [form, setForm] = useState({});

    useEffect(() => {
        setForm(getActiveForm(activeForm, propertyType));
    }, [activeForm]);

    return (
        <Grid container className="mt-5">
            <Grid item xs={4}>
                <VerticalLinearStepper activeForm={activeForm} setActiveForm={setActiveForm} />
            </Grid>
            <Grid item xs={8} id="ttb-form">
                {Object.keys(form).length > 0 && (
                    <JsonForm
                        schema={form.schema}
                        uiSchema={form.uiSchema}
                        activeForm={activeForm}
                        setActiveForm={setActiveForm}
                        setPropertyType={setPropertyType}
                    ></JsonForm>
                )}
            </Grid>
        </Grid>
    );
}

export default AddProperty;
