import React, { useState, useEffect, createRef } from "react";
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

function SidePanel({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) {
  const [placesRefsState, setPlacesRefsState] = useState([]);
  const havePlaces = places.length;

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, index) => placesRefsState[index] || createRef());
    setPlacesRefsState(refs);
  }, [places]);

  const classes = useStyles();

  const typeChangeHandler = (event) => {
    setType(event.target.value);
  };

  const ratingChangeHandler = (event) => {
    setRating(event.target.value);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Atrractions around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size={"5rem"} />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={typeChangeHandler}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={ratingChangeHandler}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3</MenuItem>
              <MenuItem value={4}>Above 4</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          {havePlaces ? (
            <Grid container spacing={3} className={classes.list}>
              {places &&
                places.map((place, index) => (
                  <Grid item key={index} xs={12} ref={placesRefsState[index]}>
                    <PlaceDetails
                      place={place}
                      selected={Number(childClicked) === index}
                      refProps={placesRefsState[index]}
                    />
                  </Grid>
                ))}
            </Grid>
          ) : (
            <Typography variant="h5">Found no {type}</Typography>
          )}
        </>
      )}
    </div>
  );
}

export default SidePanel;
