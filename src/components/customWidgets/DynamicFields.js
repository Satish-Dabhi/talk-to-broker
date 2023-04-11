import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import * as constant from "../../services/utils/constant";



const DynamicFields = (props) => {
    const { id, options, value, onChange, label, schema } = props;
    const [numFields, setNumFields] = useState(0);
    const [val, setVal] = useState([]);
    const fieldIds = numFields >= 0 && [...Array(numFields).keys()].map((i) => `${id}_${i}`);
    let fieldsValue;

    useEffect(() => {
        if (value !== undefined) {
        console.log("value",value);
            setNumFields(value.split(",").length);
            setVal(value.split(","));
        }
    }, [value]);

    useEffect(() => {
        if(value !== undefined && value.split(",").length > 0){
          setVal(value.split(","))
        }else{
          fieldsValue = numFields >= 0 && [...Array(numFields).keys()].map((i) => 0);
          setVal(fieldsValue);
        }
    }, [numFields]);

    const newHandleChange = (e, index) => {
        const newValues = [...val];
        newValues[index] = e.target.value;
        console.log("newValues",newValues.toString());
        onChange(newValues.toString());
        setVal(newValues);
    };
    return (
        <div className="dynamic-fields">
            <TextField
                id={`${id}-numFields`}
                label={label}
                type="number"
                InputLabelProps={{ shrink: true }}
                value={numFields}
                variant={"filled"}
                onChange={(e) => setNumFields(parseInt(e.target.value))}
            />
            {fieldIds.length > 0 &&
                fieldIds.map((fieldId, index) => {
                    return (
                        <TextField
                            key={fieldId}
                            className="p-1"
                            id={fieldId}
                            label={ schema.subFieldTitle ? `${schema.subFieldTitle} ${index + 1}` : `Field ${index + 1}`}
                            value={val[index] || ""}
                            onChange={(e) => newHandleChange(e, index)}
                        />
                    );
                })}
        </div>
    );
};
export default DynamicFields;
