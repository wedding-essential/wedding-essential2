import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { emailValidator } from "../../validation/validators";
import { Event } from "../../../app_types";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import WeddingTimeline from "./WeddingTimeline";

export function Intro() {
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
export function Name() {
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
export function Couple() {
  const [loveBirdOne, setLoveBirdOne] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loveBirdTwo, setLoveBirdTwo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = useState({ field: "", message: "" });

  function handleChange(
    field: "firstName" | "lastName" | "email",
    number: 1 | 2,
    value: string
  ) {
    if (number === 1) {
      setLoveBirdOne({ ...loveBirdOne, [field]: value });
    } else {
      setLoveBirdTwo({ ...loveBirdTwo, [field]: value });
    }
    if (field === "email") {
      try {
        emailValidator(value);
      } catch (err) {
        setError({ field: field, message: `${value} ${err.message}` });
      }
    }
  }

  return (
    <>
      <Typography variant="h3" gutterBottom component="h1">
        Love Birds
      </Typography>
      <Grid container columnGap={3} rowGap={2}>
        <Grid container xs={12} md={6} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography component="h5">First love bird</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="firstName"
              label="Firstname"
              type="text"
              margin="normal"
              value={loveBirdOne.firstName}
              onChange={(e) => handleChange("firstName", 1, e.target.value)}
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Lastname"
              type="text"
              margin="normal"
              value={loveBirdOne.lastName}
              onChange={(e) => handleChange("lastName", 1, e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              type="email"
              margin="normal"
              value={loveBirdOne.email}
              onChange={(e) => handleChange("email", 1, e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Grid container xs={12} md={6} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography component="h5">Second love bird</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="firstName"
              label="Firstname"
              type="text"
              margin="normal"
              value={loveBirdTwo.firstName}
              onChange={(e) => handleChange("firstName", 2, e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Lastname"
              type="text"
              margin="normal"
              value={loveBirdTwo.lastName}
              onChange={(e) => handleChange("lastName", 2, e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              type="email"
              margin="normal"
              value={loveBirdTwo.email}
              onChange={(e) => handleChange("email", 2, e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Typography paragraph>Who are the stars of this wedding?</Typography>
    </>
  );
}
export function Story() {
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
export function Dresscode() {
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
export function Guests() {
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
export function Events() {
  const initialState = {
    name: "",
    description: "",
    location: "",
    day: "",
    time: "",
  };
  const [inputEvents, setInputEvents] = useState(initialState);
  const [eventList, setEventList] = useState([]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputEvents({
      ...inputEvents,
      [event.target.id]: event.target.value,
    });
  }

  function handleAdd() {
    const [year, month, day] = inputEvents.day.split("-").map(Number);
    const [hour, minute] = inputEvents.time.split(":").map(Number);
    //reformat the date
    const reformatedDate = DateTime.fromObject({
      year,
      month,
      day,
      hour,
      minute,
    });

    const newEvent: Event = {
      id: uuidv4(),
      name: inputEvents.name,
      description: inputEvents.description,
      location: inputEvents.location,
      date: reformatedDate.toJSDate(),
    };
    setEventList(Array.from(new Set([...eventList, newEvent])));
    setInputEvents(initialState);
  }
  function handleUpdate(event: Event) {
    // Take an event and update the InputEvents
  }

  return (
    <>
      <Typography variant="h3" gutterBottom component="h1">
        Add events
      </Typography>
      <Grid container direction="row" columnSpacing={2}>
        <Grid container xs={12} md={6} columnSpacing={1}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Event name"
              type="text"
              margin="normal"
              value={inputEvents.name}
              onChange={handleChange}
              fullWidth
              autoFocus
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="location"
              label="Location"
              type="text"
              margin="normal"
              value={inputEvents.location}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              type="text"
              margin="normal"
              multiline
              rows={2}
              value={inputEvents.description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="day"
              label="Day"
              type="date"
              margin="normal"
              value={inputEvents.day}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="time"
              label="Time"
              type="time"
              margin="normal"
              value={inputEvents.time}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleAdd} variant="contained" fullWidth>
              <AddIcon />
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <WeddingTimeline events={eventList} />
        </Grid>
      </Grid>
      <Typography paragraph>
        Add all the events of your wedding, from dress fitting to the ceremony.
      </Typography>
    </>
  );
}
