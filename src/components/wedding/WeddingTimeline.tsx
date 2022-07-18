import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Event } from "../../../app_types";
import { DateTime } from "luxon";

function isPastEvent(event) {
  const currentEvent = DateTime.fromISO(event.date);
  const now = DateTime.now();
  return currentEvent < now;
}
function buildTimelineItems(events: Event[]) {
  return events.map((event) => {
    return (
      <TimelineItem key={event.id}>
        <TimelineOppositeContent>
          <Typography color="textSecondary">
            {event.date.toLocaleString(DateTime.TIME_24_SIMPLE)}
          </Typography>
        </TimelineOppositeContent>
        {isPastEvent(event) ? (
          <TimelineSeparator>
            <TimelineDot variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
        ) : (
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
        )}

        <TimelineContent>
          <Typography>{event.name}</Typography>
        </TimelineContent>
      </TimelineItem>
    );
  });
}

function buildTimelines(events: Event[]) {
  const test = events.map((event) =>
    event.date.toLocaleString(DateTime.DATE_MED)
  );

  // Find different days and sort them
  const days = Array.from(new Set(test)).sort((a, b) => {
    return b - a;
  });

  return days.map((day, idx) => {
    return (
      <Grid item key={(Math.random() * idx).toString()}>
        <Typography align="center">
          {day.toLocaleString(DateTime.DATE_MED)}
        </Typography>
        <Timeline>
          {buildTimelineItems(
            events.filter(
              (event) => event.date.toLocaleString(DateTime.DATE_MED) === day
            )
          )}
        </Timeline>
      </Grid>
    );
  });
}

export default function WeddingTimeline({ events }) {
  if (events.length < 1) {
    return (
      <Grid item>
        <Typography align="center">No event yet.</Typography>
        <Typography align="center">Create your first event.</Typography>
      </Grid>
    );
  }
  return (
    <Grid container direction="column" justifyContent="center">
      {buildTimelines(events)}
    </Grid>
  );
}
