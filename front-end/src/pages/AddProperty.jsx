import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropertyForm from "../components/jsonForm/PropertyForm";
import VerticalLinearStepper from "../components/VerticalLinearStepper";
import * as constant from "../services/utils/constant";
import { getActivePropertyForm } from "../services/utils/getActiveForm";
import { ADD_PROPERTY_FORMS } from "../services/utils";

function AddProperty() {
    const [activeForm, setActiveForm] = useState(0);
    const [propertyType, setPropertyType] = useState(constant.DEVELOPER_PROPERTY);
    const [form, setForm] = useState({});


    useEffect(() => {
        setForm(getActivePropertyForm(activeForm, propertyType));
    }, [activeForm]);

    return (
        <Grid container>
            <Grid item xs={4}>
                <VerticalLinearStepper activeForm={activeForm} setActiveForm={setActiveForm} stepperData={ADD_PROPERTY_FORMS}/>
            </Grid>
            <Grid item xs={8} id="ttb-form">
                {Object.keys(form).length > 0 && (
                    <PropertyForm
                        schema={form.schema}
                        uiSchema={form.uiSchema}
                        activeForm={activeForm}
                        setActiveForm={setActiveForm}
                        setPropertyType={setPropertyType}
                    ></PropertyForm>
                )}
            </Grid>
        </Grid>
    );
}

export default AddProperty;
