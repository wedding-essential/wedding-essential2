import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { eventValidator } from "../../../validation/validators";
import { Event } from "../../../../app_types";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Events() {
  const initialInputState = {
    id: "",
    name: "",
    description: "",
    location: "",
    day: "",
    time: "",
  };

  const [inputEvent, setInputEvent] = useState(initialInputState);
  const [isNewEvent, setIsNewEvent] = useState(true);
  const [eventList, setEventList] = useState([]);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputEvent({
      ...inputEvent,
      [event.target.id]: event.target.value,
    });
  }
  function dateInputToDateTime() {
    const [year, month, day] = inputEvent.day.split("-").map(Number);
    const [hour, minute] = inputEvent.time.split(":").map(Number);
    return DateTime.fromObject({
      year,
      month,
      day,
      hour,
      minute,
    });
  }

  function handleAdd() {
    const newEvent: Event = {
      id: uuidv4(),
      name: inputEvent.name,
      description: inputEvent.description,
      location: inputEvent.location,
      date: dateInputToDateTime(),
      participants: [],
    };

    try {
      eventValidator(newEvent);
      setEventList(Array.from(new Set([...eventList, newEvent])));
      setInputEvent(initialInputState);
      setIsNewEvent(true);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  function handleUpdateEvent() {
    const newEvent = {
      id: inputEvent.id,
      name: inputEvent.name,
      description: inputEvent.description,
      location: inputEvent.location,
      date: dateInputToDateTime(),
      participants: [],
    };
    try {
      eventValidator(newEvent);
      const newEventList = eventList.map((event) => {
        if (event.id === inputEvent.id) {
          return newEvent;
        }
        return event;
      });
      setEventList(newEventList);
      setInputEvent(initialInputState);
      setIsNewEvent(true);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  function handleUpdateForm(eventId: string) {
    const event = eventList.find((event) => event.id === eventId);
    const [day, time] = event.date.toFormat("yyyy-MM-dd,HH:mm").split(",");

    if (event) {
      setInputEvent({ ...event, day, time });
      setIsNewEvent(false);
    }
  }

  return (
    <>
      <Typography variant="h3" gutterBottom component="h1">
        Add events
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {error}
      </Typography>
      <Grid container direction="row" columnSpacing={2}>
        <Grid container xs={12} md={6} columnSpacing={1}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Event name"
              type="text"
              margin="normal"
              value={inputEvent.name}
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
              value={inputEvent.location}
              onChange={handleChange}
              fullWidth
              required
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
              value={inputEvent.description}
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
              value={inputEvent.day}
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
              value={inputEvent.time}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            {isNewEvent && (
              <Button onClick={handleAdd} variant="contained" fullWidth>
                <AddIcon />
              </Button>
            )}
            {!isNewEvent && (
              <Button onClick={handleUpdateEvent} variant="contained" fullWidth>
                Update
              </Button>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          {eventList.map((event) => (
            <Box>
              <Typography variant="h5">{event.name}</Typography>
              <Chip
                icon={<AccessTimeIcon />}
                label={event.date.toLocaleString(DateTime.DATE_FULL)}
                variant="outlined"
              />
              <Chip
                icon={<LocationOnIcon />}
                label={event.location}
                variant="outlined"
              />
              <Typography sx={{ fontStyle: "italic" }} variant="body1">
                {event.description}
              </Typography>
              <Button onClick={() => handleUpdateForm(event.id)}>Edit</Button>{" "}
              <Button color="warning">Delete</Button>
            </Box>
          ))}
        </Grid>
      </Grid>
      <Typography paragraph>
        Add all the events of your wedding, from dress fitting to the ceremony.
      </Typography>
    </>
  );
}
