import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function Name() {
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
