import React, { useState, useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { emailValidator } from "../../validation/validators";

// Wizard components

function Intro() {
  return (
    <>
      <Typography variant="h2" gutterBottom component="h1">
        Intro
      </Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        illum odit, doloremque distinctio modi maxime incidunt alias earum
        exercitationem deserunt nulla quasi provident voluptatum ducimus cum
        maiores dolorem fugiat laudantium.
      </Typography>
    </>
  );
}
function Name() {
  const [name, setName] = useState("");
  return (
    <>
      <Typography variant="h3" gutterBottom component="h1">
        Name your wedding
      </Typography>
      <TextField
        fullWidth
        id="name"
        label="Name"
        type="text"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoFocus
      />
      <Typography paragraph>
        The wedding name will appear on each communication to your guests. It
        can be the name of the couple.
      </Typography>
    </>
  );
}
function Story() {
  const [story, setStory] = useState("");
  return (
    <>
      <Typography variant="h3" gutterBottom component="h1">
        Tell your story
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        autoFocus
        id="story"
        label="Story"
        type="text"
        value={story}
        onChange={(e) => setStory(e.target.value)}
        margin="normal"
      />
      <Typography paragraph>
        How did you meet? How did you propose? Tell your guests about your
        special story.
      </Typography>
    </>
  );
}
function Dresscode() {
  return (
    <>
      <Typography variant="h3" gutterBottom component="h1">
        Dresscode
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        id="dresscode"
        label="Dresscode"
        type="text"
        margin="normal"
        autoFocus
      />
      <Typography paragraph>
        Dresscode is important, it can be traditional, gothic, medieval. The
        limit is your imagination
      </Typography>
    </>
  );
}
function Guests() {
  const [inputGuests, setInputGuests] = useState("");
  const [invalidGuests, setInvalidGuests] = useState([]);
  const [multipleInputGuests, setMultipleInputGuests] = useState(false);
  const [guestList, setGuestList] = useState(["hello@world.com"]);

  function handleInputChange(change: "single" | "multiple") {
    if (change === "single") setMultipleInputGuests(false);
    if (change === "multiple") setMultipleInputGuests(true);
    setInvalidGuests([]);
  }

  function handleDelete(deletedGuest: string) {
    const filtered = guestList.filter((guest) => guest !== deletedGuest);
    setGuestList(filtered);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputGuests(event.target.value);
  }

  function handleAddOne() {
    console.log("add single");
    const trimmedGuest = inputGuests.trim();
    try {
      emailValidator(trimmedGuest);
    } catch (error) {
      setInvalidGuests([trimmedGuest]);
      return;
    }

    setGuestList(Array.from(new Set([...guestList, trimmedGuest])));
    setInputGuests("");
  }

  function handleAddMultiple() {
    let invalids = [];
    let multipleGuests = inputGuests
      .split("\n")
      .map((guest) => guest.trim())
      .filter((email) => {
        try {
          emailValidator(email);
        } catch (error) {
          if (error.message === "is not a valid email") {
            invalids.push(error.value);
          }
          return false;
        }
        return true;
      });
    setInvalidGuests(invalids);
    setGuestList(Array.from(new Set([...guestList, ...multipleGuests])));
    setInputGuests("");
  }

  function AddButton() {
    return (
      <Button
        size="large"
        onClick={multipleInputGuests ? handleAddMultiple : handleAddOne}
      >
        <AddIcon fontSize="large" />
      </Button>
    );
  }

  return (
    <>
      <Typography variant="h3" gutterBottom component="h1">
        Add guests
      </Typography>
      <Grid
        container
        direction="row"
        columnSpacing={3} /* justifyContent={"space-around"} */
      >
        <Grid item xs={6}>
          {!multipleInputGuests && (
            <TextField
              fullWidth
              id="guest"
              label="Guest"
              type="email"
              margin="normal"
              value={inputGuests}
              onChange={handleChange}
              placeholder="john@doe.com"
              autoFocus
              InputProps={{
                endAdornment: <AddButton />,
              }}
              helperText={
                <>
                  Want to add multiple guests?
                  <Button
                    variant="text"
                    onClick={() => handleInputChange("multiple")}
                  >
                    Click here
                  </Button>
                </>
              }
            />
          )}
          {multipleInputGuests && (
            <TextField
              id="guests"
              label="Guests"
              type="email"
              margin="normal"
              value={inputGuests}
              onChange={handleChange}
              fullWidth
              placeholder="Add a list of line separated emails"
              autoFocus
              multiline
              rows={4}
              InputProps={{
                endAdornment: <AddButton />,
              }}
              helperText={
                <>
                  Want to add one guest at a time?
                  <Button
                    variant="text"
                    onClick={() => handleInputChange("single")}
                  >
                    Click here
                  </Button>
                </>
              }
            />
          )}
          {invalidGuests.length > 0 && (
            <Grid item xs={6}>
              <Typography color="warning.dark" component="h6">
                {invalidGuests.length > 1
                  ? `${invalidGuests.length} emails are invalid: `
                  : `${invalidGuests.length} email is invalid: `}
              </Typography>
              <List dense>
                {invalidGuests.map((invalid) => (
                  <ListItem>
                    <Typography color="warning.dark">{invalid}</Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography>
            {guestList.length > 1
              ? `You have ${guestList.length} guests:`
              : `You have ${guestList.length} guest:`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              listStyle: "none",
              p: 1,
              m: 0,
            }}
          >
            {guestList.map((guest, idx) => (
              <Chip
                sx={{ marginRight: "0.2em", marginBottom: "0.5em" }}
                color={idx % 2 === 0 ? "primary" : "secondary"}
                label={guest}
                onDelete={() => handleDelete(guest)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
function Events() {
  return (
    <>
      <Typography variant="h3" gutterBottom component="h1">
        Add events
      </Typography>
      <Typography paragraph>Event creator here.</Typography>
      <Typography paragraph>
        Add all the events of your wedding, from dress fitting to the ceremony.
      </Typography>
    </>
  );
}
function Witness() {
  return (
    <>
      <Typography variant="h3" gutterBottom component="h1">
        Who are your witnesses?
      </Typography>
      <Typography paragraph>Witness selector</Typography>
      <Typography paragraph>Bridesmaid.</Typography>
    </>
  );
}

//Wizard steps

export default function WeddingWizard({ initialStep = 4 }) {
  const [currentStep, setCurrentStep] = useState(4);

  const wizardSteps = [
    {
      label: "Intro",
      component: <Intro />,
      required: false,
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
    {
      label: "Witness",
      component: <Witness />,
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
      //true will be replaced by existence of the value of the step
      setCurrentStep(currentStep + 1);
    }
  }

  function handleCreate() {
    console.log("Handle creation of the wedding");
  }

  useEffect(() => {
    setCurrentStep(initialStep);
  }, []);

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="space-between"
      spacing={3}
    >
      <Grid item>
        <Stepper activeStep={currentStep} alternativeLabel>
          {wizardSteps.map((step) => {
            return (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
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
  );
}
