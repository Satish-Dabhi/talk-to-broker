import { Button, FormControl, FormLabel, Grid, Slider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as constant from "../../services/utils/constant";
import DeleteIcon from "@mui/icons-material/Delete";

const SliderRangeField = ({
    id,
    label,
    required,
    disabled,
    readonly,
    value,
    onChange,
    onBlur,
    onFocus,
    errors,
    schema,
    uiSchema,
    step = 1,
    min = 10,
    max = 50,
}) => {
    const [sliderValues, setSliderValues] = useState([]);
    const [sliderItemValues, setSliderItemValues] = useState([]);
    const { minimum, maximum, defaultMinimum, defaultMaximum } = uiSchema;

    useEffect(() => {
        if (value !== undefined && value !== "") {
            const arrayValue = JSON.parse(value);
            if (arrayValue.length > 0) {
                const newSliderItemValues = JSON.parse(value).map((value) => value[2] ?? 0);
                setSliderItemValues(newSliderItemValues);
                const newSliderValues = JSON.parse(value).map((value, index) => {
                    value.splice(2, 1);
                    return value;
                });
                setSliderValues(newSliderValues);
            }
        }
    }, [value]);

    useEffect(() => {
        const fieldValue = sliderValues.map((value, index) => [...value, sliderItemValues[index]]);
        onChange(JSON.stringify(fieldValue));
    }, [sliderValues, sliderItemValues]);

    const addSlider = () => {
        setSliderValues([...sliderValues, [defaultMinimum, defaultMaximum]]);
        setSliderItemValues([...sliderItemValues, 0]);
    };

    const removeSlider = (index) => {
        const newSliderValues = [...sliderValues];
        newSliderValues.splice(index, 1);
        const newSliderItemValues = [...sliderItemValues];
        newSliderItemValues.splice(index, 1);
        setSliderValues(newSliderValues);
        setSliderItemValues(newSliderItemValues);
    };

    const updateSlider = (index, value) => {
        const newSliderValues = [...sliderValues];
        newSliderValues[index] = value;
        setSliderValues(newSliderValues);
    };

    const handleSliderChange = (index) => (event, value) => {
        updateSlider(index, value);
    };

    const updateSliderItemValue = (e, index) => {
        const itemValue =
            e.target.value && e.target.value != undefined ? parseInt(e.target.value) : 0;
        const newItemValue = [...sliderItemValues];
        newItemValue[index] = itemValue;
        setSliderItemValues(newItemValue);
    };
    return (
        <>
            <FormControl fullWidth>
                {label && <FormLabel>{label}</FormLabel>}
                {sliderValues.map((sliderValue, index) => (
                    <div key={index}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={8} className="d-flex align-items-center">
                                <Slider
                                    value={sliderValue}
                                    step={step}
                                    min={minimum}
                                    max={maximum}
                                    onChange={handleSliderChange(index)}
                                    disabled={disabled || readonly}
                                    aria-labelledby={`${id}${index}`}
                                    range="true"
                                    valueLabelDisplay="on"
                                />
                            </Grid>
                            <Grid item xs={12} md={4} className="d-flex align-items-center">
                                <TextField
                                    key={`text-field-${id}`}
                                    className="m-3"
                                    id={`text-field-${id}`}
                                    label={`Value of ${sliderValue[0]} to ${sliderValue[1]} ${schema.subTitle}`}
                                    variant={constant.STANDARD_FORM_VARIANT}
                                    value={sliderItemValues[index] ?? ""}
                                    onChange={(e) => updateSliderItemValue(e, index)}
                                />
                                <DeleteIcon
                                    onClick={() => removeSlider(index)}
                                    sx={{ color: "red", cursor: "pointer" }}
                                    fontSize="large"
                                />
                            </Grid>
                        </Grid>
                    </div>
                ))}
                <Button variant="contained" color="primary" onClick={addSlider}>
                    {`Add ${schema.subTitle} Slider`}
                </Button>
            </FormControl>
        </>
    );
};
export default SliderRangeField;
