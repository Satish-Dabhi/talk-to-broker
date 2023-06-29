import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as constant from "../../services/utils/constant";

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
                                <Grid item xs={3} md={3} className="width-length-field">
                                    <TextField
                                        key={`width-${fieldId}`}
                                        className="m-3 m-xs-0"
                                        id={`width-${fieldId}`}
                                        label={"Width"}
                                        variant={constant.STANDARD_FORM_VARIANT}
                                        value={val[index].width ?? ""}
                                        onChange={(e) => widthHandleChange(e, index)}
                                    />
                                </Grid>
                                <div className="pt-5">X</div>
                                <Grid item xs={3} md={3} className="width-length-field">
                                    <TextField
                                        key={`length-${fieldId}`}
                                        className="m-3 m-xs-0"
                                        id={`length-${fieldId}`}
                                        label={"Length"}
                                        variant={constant.STANDARD_FORM_VARIANT}
                                        value={val[index].length ?? ""}
                                        onChange={(e) => lengthHandleChange(e, index)}
                                    />
                                </Grid>
                                <div className="pt-5">=</div>
                                <Grid item xs={4} md={3} className="width-length-field">
                                    <TextField
                                        key={`total-${fieldId}`}
                                        className="m-3 m-xs-0"
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
        </div>
    );
};
export default WidthLengthField;
