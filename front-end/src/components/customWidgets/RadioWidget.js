import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import React from "react";

const RadioWidget = (props) => {
    console.log("props", props);
    const { options, value, onChange, schema, id, label } = props;
console.log("schema",schema);
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
