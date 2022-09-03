import React, { useState, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Intro from "./wizardSteps/Intro";
import Couple from "./wizardSteps/Couple";
import Name from "./wizardSteps/Name";
import Dresscode from "./wizardSteps/Dresscode";
import Events from "./wizardSteps/Events";
import Story from "./wizardSteps/Story";
import Guests from "./wizardSteps/Guests";

export default function WeddingWizard(props) {
  const [currentStep, setCurrentStep] = useState(0);

  const wizardSteps = [
    {
      label: "Intro",
      component: <Intro />,
      required: false,
    },
    {
      label: "Couple",
      component: <Couple />,
      required: true,
    },
    {
      label: "Name",
      component: <Name />,
      required: true,
    },
    {
      label: "Story",
      component: <Story />,
      required: false,
    },
    {
      label: "Dresscode",
      component: <Dresscode />,
      required: false,
    },
    {
      label: "Guests",
      component: <Guests />,
      required: false,
    },
    {
      label: "Events",
      component: <Events />,
      required: false,
    },
  ];

  function handleBack() {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleNext() {
    const isRequired = wizardSteps[currentStep].required;
    if (!isRequired || (isRequired && true)) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleCreate() {
    console.log("Handle creation of the wedding");
  }

  useEffect(() => {
    setCurrentStep(props.initialStep | 0);
  }, []);

  return (
    <>
      <Stepper activeStep={currentStep} alternativeLabel>
        {wizardSteps.map((step) => {
          return (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Grid
        container
        flexDirection="column"
        justifyContent="space-between"
        spacing={3}
      >
        <Grid item></Grid>
        <Grid item>
          {<Container>{wizardSteps[currentStep].component}</Container>}
        </Grid>
        <Grid item alignSelf="center">
          {currentStep !== 0 && <Button onClick={handleBack}>Back</Button>}
          {currentStep !== wizardSteps.length - 1 && (
            <Button onClick={handleNext} variant="contained">
              Next
            </Button>
          )}
          {currentStep === wizardSteps.length - 1 && (
            <Button variant="contained" size="large" onClick={handleCreate}>
              Create
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}
