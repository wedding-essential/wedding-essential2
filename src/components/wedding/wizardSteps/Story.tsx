import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function Story() {
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
