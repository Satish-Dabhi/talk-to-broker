import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
    {
        label: "Basic Information",
    },
    {
        label: "About Property",
    },
    {
        label: "Form 3",
        description: `desc 3`,
    },
];

const VerticalLinearStepper = (props) => {
    const [activeStep, setActiveStep] = useState(0);

    const { activeForm, setActiveForm } = props;

    useEffect(() => {
        console.log("changed", activeForm);
        setActiveStep(activeForm);
    }, [activeForm]);

    const onStepClick = (index) => {
        console.log("step clicked", index);
        setActiveStep(index);
        setActiveForm(index);
    };

    return (
        <Box sx={{ maxWidth: 400, padding: "20%" }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            onClick={() => onStepClick(index)}
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
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
