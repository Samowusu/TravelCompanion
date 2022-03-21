import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import useStyles from "./styles";
import PlaceDetails from "../placeDetails/PlaceDetails";

function SidePanel() {
  const [typeState, setTypeState] = useState("restaurants");
  const [ratingState, setRatingState] = useState("");
  const classes = useStyles();

  const places = [
    { name: "cool place" },
    { name: "best beer" },
    { name: "best steak" },
    { name: "best softdrinks" },
    { name: "best food" },
    { name: "best alcohol" },
    { name: "best decor" },
    { name: "best music" },
    { name: "best furniture" },
  ];
  const typeChangeHandler = (event) => {
    setTypeState(event.target.value);
  };

  const ratingChangeHandler = (event) => {
    setRatingState(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Atrractions around you
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={typeState} onChange={typeChangeHandler}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={ratingState} onChange={ratingChangeHandler}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3</MenuItem>
          <MenuItem value={4}>Above 4</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places &&
          places.map((place, index) => (
            <Grid item key={index} xs={12}>
              <PlaceDetails place={place} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default SidePanel;
