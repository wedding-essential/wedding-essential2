import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function Dresscode() {
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
