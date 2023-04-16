import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import * as constant from "../../services/utils/constant";
import { FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";
import {FormControl, Box} from '@mui/material';

const DynamicFields = (props) => {
    const { id, value, onChange, label, schema, uiSchema, required } = props;
    const [numFields, setNumFields] = useState(0);
    const [val, setVal] = useState([]);
    const fieldIds = numFields >= 0 && [...Array(numFields).keys()].map((i) => `${id}_${i}`);
    const maxOptions = uiSchema.options ?? constant.DYNAMIC_FIELD_MAX_OPTIONS;

    useEffect(() => {
        if (value !== undefined) {
            setNumFields(value.split(",").length);
            setVal(value.split(","));
        }
    }, [value]);

    useEffect(() => {
            if (value !== undefined && value.split(",").length > 0) {
                setVal(value.split(","));
            } else {
                const fieldsValue = numFields >= 0 && [...Array(numFields).keys()].map((i) => 0);
                setVal(fieldsValue);
            }
    }, [numFields]);

    const newHandleChange = (e, index) => {
        const newValues = [...val];
        newValues[index] = e.target.value;
        onChange(newValues.toString());
        setVal(newValues);
    };

    return (
        <div className="dynamic-fields">
            <Box sx={{ minWidth: 120 }} >
            <FormControl fullWidth variant="filled">
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
                       return <MenuItem value={i+1}>{i+1}</MenuItem>;
                    })}
                </Select>
            </FormControl>
            </Box>
            {fieldIds.length > 0 &&
                fieldIds.map((fieldId, index) => {
                    return (
                        <TextField
                            key={fieldId}
                            variant="filled"
                            className="p-1"
                            id={fieldId}
                            label={
                                schema.subFieldTitle
                                    ? `${schema.subFieldTitle} ${index + 1}`
                                    : `Field ${index + 1}`
                            }
                            value={val[index] || ""}
                            onChange={(e) => newHandleChange(e, index)}
                            
                        />
                    );
                })}
        </div>
    );
};
export default DynamicFields;
