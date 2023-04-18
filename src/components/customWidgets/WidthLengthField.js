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
    const maxOptions = uiSchema.options ?? constant.DYNAMIC_FIELD_MAX_OPTIONS;

    useEffect(() => {
        if (value !== undefined) {
            updateFieldValues();
        }
    }, [value]);

    const updateFieldValues = () => {
        setNumFields(JSON.parse(value).length);
            setVal(JSON.parse(value));
            const options = JSON.parse(value).length >= 0 && [...Array(JSON.parse(value).length).keys()].map((i) => `${id}_${i}`);
            setFieldIds(options);
    }

    useEffect(() => {
        if (value !== undefined && JSON.parse(value).length == numFields) {
            updateFieldValues();
        } else {
            const options = numFields >= 0 && [...Array(numFields).keys()].map((i) => `${id}_${i}`);
            setFieldIds(options);
            const fieldsValue =
                numFields >= 0 &&
                [...Array(numFields).keys()].map((i) => ({
                    length: 0,
                    width: 0,
                    total: 0,
                }));
            setVal(fieldsValue);
        }
    }, [numFields]);

    const widthHandleChange = (e, index) => {
        const widthValue =
            e.target.value && e.target.value != undefined ? parseInt(e.target.value) : 0;
        const newValues = [...val];
        newValues[index] = {
            length: newValues[index].length,
            width: widthValue,
            total: widthValue * newValues[index].length,
        };
        onChange(JSON.stringify(newValues));
        setVal(newValues);
    };

    const lengthHandleChange = (e, index) => {
        const lengthValue =
            e.target.value && e.target.value != undefined ? parseInt(e.target.value) : 0;
        const newValues = [...val];
        newValues[index] = {
            length: lengthValue,
            width: newValues[index].width,
            total: lengthValue * newValues[index].width,
        };
        onChange(JSON.stringify(newValues));
        setVal(newValues);
    };

    return (
        <div className="dynamic-fields">
            <Box>
                <FormControl fullWidth>
                    <InputLabel id={`label-${id}`}>{required ? `${label}*` : label}</InputLabel>
                    <Select
                        labelId={`select-label-${id}`}
                        id={`select-${id}`}
                        value={numFields}
                        onChange={(e) => setNumFields(parseInt(e.target.value))}
                    >
                        {[...Array(maxOptions).keys()].map((i) => {
                            return <MenuItem value={i + 1}>{i + 1}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
            </Box>
            {console.log("fieldIds",fieldIds)}
            {fieldIds.length > 0 &&
                fieldIds.map((fieldId, index) => {
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
                                        key={`width-${fieldId}`}
                                        className="m-3"
                                        id={`width-${fieldId}`}
                                        label={"Width"}
                                        variant={constant.STANDARD_FORM_VARIANT}
                                        value={val[index].width ?? ""}
                                        onChange={(e) => widthHandleChange(e, index)}
                                    />
                                </Grid>
                                <div className="pt-5">X</div>
                                <Grid item xs={3} md={3}>
                                    <TextField
                                        key={`length-${fieldId}`}
                                        className="m-3"
                                        id={`length-${fieldId}`}
                                        label={"Length"}
                                        variant={constant.STANDARD_FORM_VARIANT}
                                        value={val[index].length ?? ""}
                                        onChange={(e) => lengthHandleChange(e, index)}
                                    />
                                </Grid>
                                <div className="pt-5">=</div>
                                <Grid item xs={3} md={3}>
                                    <TextField
                                        key={`total-${fieldId}`}
                                        className="m-3"
                                        id={`total-${fieldId}`}
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
