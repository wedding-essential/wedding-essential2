import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import { Event } from "../../../app_types";

/* TODO */
/* When an event is passed the dot is outlined. Dot and Connectors are grey */
/* When an event is to come, the dot is full. Dot and Connectors are gold */

function buildTimelineItems(events: Event[]) {
  return events.map((event) => {
    return (
      <TimelineItem key={event.id}>
        <TimelineOppositeContent>
          <Typography color="textSecondary">
            {event.date.toLocaleTimeString(undefined, { timeStyle: "short" })}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography>{event.name}</Typography>
        </TimelineContent>
      </TimelineItem>
    );
  });
}

function buildTimelines(events: Event[]) {
  // Find different days and sort them
  const days = events
    .map((event) => event.date.toLocaleDateString())
    .filter((date, index, array) => {
      return array.indexOf(date) === index;
    })
    .sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });

  return days.map((day, idx) => {
    return (
      <div key={(Math.random() * idx).toString()}>
        <h3 className="text-align-center ff-sans">
          {new Date(day).toLocaleDateString(undefined, {
            dateStyle: "full",
          })}
        </h3>
        <Timeline>
          {buildTimelineItems(
            events.filter((event) => event.date.toLocaleDateString() === day)
          )}
        </Timeline>
      </div>
    );
  });
}

export default function WeddingTimeline({ events }) {
  return <div>{buildTimelines(events)};</div>;
}
