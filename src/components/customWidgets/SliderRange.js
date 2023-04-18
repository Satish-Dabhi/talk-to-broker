import React, { useState } from "react";
import MuiSlider from "@material-ui/core/Slider";
import { Button, FormControl, FormLabel, Slider } from "@material-ui/core";
import { FieldProps } from "@rjsf/core";
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
    min = [10],
    max = 50,
}) => {
    const [sliderValues, setSliderValues] = useState(value || []);
    const addSlider = () => {
        console.log([...sliderValues, [min, max]]);
        setSliderValues([...sliderValues, [min, max]]);
    };
    const removeSlider = (index) => {
        const newSliderValues = [...sliderValues];
        newSliderValues.splice(index, 1);
        setSliderValues(newSliderValues);
        onChange(newSliderValues);
    };
    const updateSlider = (index, value) => {
        const newSliderValues = [...sliderValues];
        newSliderValues[index] = value;
        console.log("newSliderValues", newSliderValues);
        setSliderValues(newSliderValues);
        onChange(newSliderValues);
    };
    const handleSliderChange = (index) => (event, value) => {
        updateSlider(index, value);
    };
    const handleInputChange = (index) => (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            updateSlider(index, value);
        }
    };
    return (
        <div>
            {" "}
            <FormControl fullWidth>
                {" "}
                {label && <FormLabel>{label}</FormLabel>}{" "}
                {sliderValues.map((sliderValue, index) => (
                    <div key={index}>
                        {" "}
                        <Slider
                            value={sliderValue}
                            step={step}
                            min={10}
                            max={100}
                            onChange={handleSliderChange(index)}
                            disabled={disabled || readonly}
                            aria-labelledby={`${id}${index}`}
                            range
                        />{" "}
                        <input
                            type="number"
                            value={sliderValue[0]}
                            onChange={handleInputChange(index)}
                            disabled={disabled || readonly}
                            aria-label={`${id}${index}`}
                        />{" "}
                        <input
                            type="number"
                            value={sliderValue[1]}
                            onChange={handleInputChange(index)}
                            disabled={disabled || readonly}
                            aria-label={`${id}_${index}`}
                        />{" "}
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeSlider(index)}
                        >
                            {" "}
                            Remove{" "}
                        </Button>{" "}
                    </div>
                ))}{" "}
                <Button variant="contained" color="primary" onClick={addSlider}>
                    {" "}
                    Add Slider{" "}
                </Button>{" "}
            </FormControl>{" "}
        </div>
    );
};
export default SliderRangeField;
