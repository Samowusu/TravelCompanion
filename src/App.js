import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/header/Header";
import SidePanel from "./components/sidePanel/SidePanel";
import Map from "./components/map/Map";

import { getPlacesData, getWeatherData } from "./api/api";

function App() {
  const [placesState, setPlacesState] = useState([]);
  const [filteredPlacesState, setFilteredPlacesState] = useState([]);
  const [weatherState, setWeatherState] = useState([]);

  const [coordinatesState, setCoordinatesState] = useState({});
  const [boundsState, setBoundsState] = useState({});

  const [childClickedState, setChildClickedState] = useState(null);
  const [isLoadingState, setIsLoadingState] = useState(false);

  const [typeState, setTypeState] = useState("restaurants");
  const [ratingState, setRatingState] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinatesState({ lng: longitude, lat: latitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = placesState.filter(
      (place) => Number(place.rating) > ratingState
    );
    setFilteredPlacesState(filteredPlaces);
  }, [ratingState]);

  useEffect(() => {
    if (boundsState.ne && boundsState.sw) {
      setIsLoadingState(true);

      getWeatherData(coordinatesState.lng, coordinatesState.lat).then((data) =>
        setWeatherState(data)
      );

      getPlacesData(typeState, boundsState.sw, boundsState.ne).then((data) => {
        setPlacesState(
          data?.filter((place) => place.name && place.num_reviews > 0)
        );
        setFilteredPlacesState([]);
        setRatingState("");
        setIsLoadingState(false);
      });
    }
  }, [boundsState, typeState]);

  return (
    <>
      {/*  normalizes the styling of the project */}
      <CssBaseline />
      <Header setCoordinates={setCoordinatesState} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <SidePanel
            places={
              filteredPlacesState.length ? filteredPlacesState : placesState
            }
            childClicked={childClickedState}
            isLoading={isLoadingState}
            type={typeState}
            setType={setTypeState}
            rating={ratingState}
            setRating={setRatingState}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinatesState}
            setBounds={setBoundsState}
            coordinates={coordinatesState}
            places={
              filteredPlacesState.length ? filteredPlacesState : placesState
            }
            setChildClicked={setChildClickedState}
            weatherData={weatherState}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
