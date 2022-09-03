import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { emailValidator } from "../../../validation/validators";

export default function Couple() {
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
