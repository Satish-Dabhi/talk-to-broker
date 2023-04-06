import React from "react";
import { Box, Grid } from "@material-ui/core";
import JsonForm from "./JsonForm";

const AddProperty = () => {
    return (
        <Grid container className="mt-5">
            <Grid item xs={4}>
                ...3
            </Grid>
            <Grid item xs={8} className="ttb-form">
                <JsonForm />
            </Grid>
        </Grid>
    );
};

export default AddProperty;
