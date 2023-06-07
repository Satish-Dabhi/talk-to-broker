import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

const RadioWidget = (props) => {
    const { options, value, onChange, schema, id, label } = props;
    return (
        <FormControl>
            <FormLabel id={id}>{label}</FormLabel>
            <RadioGroup row name="row-radio-buttons-group">
                {schema.enum &&
                    schema.enum.length > 0 &&
                    schema.enum.map((option, index) => {
                        return (
                            <FormControlLabel
                                key={index}
                                value={option}
                                control={<Radio color="primary" />}
                                label={schema.enumNames[index]}
                                checked={value === option}
                                onChange={(event) => onChange(event.target.value)}
                            />
                        );
                    })}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioWidget;
