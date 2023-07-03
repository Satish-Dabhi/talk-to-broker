import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

const VerticalLinearStepper = (props) => {

    const { activeForm, setActiveForm, stepperData } = props;

    const onStepClick = (index) => {
        // setActiveStep(index);
        setActiveForm(index);
    };

    return (
        <Box sx={{ maxWidth: 400, padding: "20%" }}>
            <Stepper activeStep={activeForm} orientation="vertical">
                {stepperData && stepperData.length > 0 && stepperData.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            // onClick={() => onStepClick(index)}
                            className="steps"
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default VerticalLinearStepper;
