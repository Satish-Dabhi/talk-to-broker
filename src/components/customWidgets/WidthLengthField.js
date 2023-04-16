import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import * as constant from "../../services/utils/constant";
// import { FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";
import { FormControl, Box, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Typography } from "@material-ui/core";

const WidthLengthField = (props) => {
    const { id, value, onChange, label, schema, uiSchema, required } = props;
    const [numFields, setNumFields] = useState(0);
    const [val, setVal] = useState([]);
    const [fieldIds, setFieldIds] = useState([]);
    // const fieldIds = numFields >= 0 && [...Array(numFields).keys()].map((i) => `${id}_${i}`);
    const maxOptions = uiSchema.options ?? constant.DYNAMIC_FIELD_MAX_OPTIONS;

    useEffect(() => {
        if (value !== undefined) {
            setNumFields(value.split(",").length);
            setVal(value.split(","));
        }
    }, [value]);

    useEffect(() => {
        const options = numFields >= 0 && [...Array(numFields).keys()].map((i) => `${id}_${i}`);
        setFieldIds(options);
        if (value !== undefined && value.split(",").length > 0) {
            setVal(value.split(","));
        } else {
            const fieldsValue =
                numFields >= 0 &&
                [...Array(numFields).keys()].map((i) => ({
                    length: 0,
                    width: 0,
                    total: 0,
                }));
            console.log("fieldsValue", fieldsValue);
            setVal(fieldsValue);
        }
    }, [numFields]);

    const widthHandleChange = (e, index) => {
        console.log("e.target.value.width",e.target.value);
        // if (e.target.value != undefined && parseInt(e.target.value) > 0) {
            const widthValue = e.target.value && e.target.value != undefined ? parseInt(e.target.value) : 0;
            const newValues = [...val];
            newValues[index] = {
                length: newValues[index].length,
                width: widthValue,
                total: widthValue * newValues[index].length,
            };
            onChange(newValues.toString());
            console.log("newValues", newValues);
            setVal(newValues);
        // }
    };

    const lengthHandleChange = (e, index) => {
        console.log("e.target.value.length",e.target.value);
        // if (e.target.value != undefined && parseInt(e.target.value) > 0) {
            const lengthValue = e.target.value && e.target.value != undefined ? parseInt(e.target.value) : 0;
            const newValues = [...val];
            newValues[index] = {
                length: lengthValue,
                width: newValues[index].width,
                total: lengthValue * newValues[index].width,
            };
            onChange(newValues.toString());
            console.log("newValues-h", newValues);
            setVal(newValues);
        // }
    };

    return (
        <div className="dynamic-fields">
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        {required ? `${label}*` : label}
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={numFields}
                        label="Age"
                        onChange={(e) => setNumFields(parseInt(e.target.value))}
                    >
                        {[...Array(maxOptions).keys()].map((i) => {
                            return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
            </Box>
            {fieldIds.length > 0 &&
                fieldIds.map((fieldId, index) => {
                    console.log("val[index].width",val[index].width);
                    console.log("val[index].length",val[index].length);
                    return (
                        <>
                            <Typography mt={2}>
                                {schema.subFieldTitle
                                    ? `${schema.subFieldTitle} ${index + 1}`
                                    : `Field ${index + 1}`}
                            </Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={3} md={3}>
                                    <TextField
                                        key={fieldId}
                                        className="m-3"
                                        id={fieldId}
                                        label={"Width"}
                                        variant={constant.STANDARD_FORM_VARIANT}
                                        value={val[index].width ?? ""}
                                        onChange={(e) => widthHandleChange(e, index)}
                                    />
                                </Grid>
                                <div className="pt-5">X</div>
                                <Grid item xs={3} md={3}>
                                    <TextField
                                        key={fieldId}
                                        className="m-3"
                                        id={fieldId}
                                        label={"Length"}
                                        variant={constant.STANDARD_FORM_VARIANT}
                                        value={val[index].length ?? ""}
                                        onChange={(e) => lengthHandleChange(e, index)}
                                    />
                                </Grid>
                                <div className="pt-5">=</div>
                                <Grid item xs={3} md={3}>
                                    <TextField
                                        key={fieldId}
                                        className="m-3"
                                        id={fieldId}
                                        label={"Total"}
                                        variant={constant.STANDARD_FORM_VARIANT}
                                        value={val[index].total ?? ""}
                                        readOnly={true}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    );
                })}
            {/* <TextField
                key={`total-${id}`}
                className="p-1"
                id={`total-${id}`}
                label={"Total"}
                variant={"filled"}
                // value={}
                // onChange={(e) => newHandleChange(e, index)}
            /> */}
        </div>
    );
};
export default WidthLengthField;
