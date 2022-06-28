import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlined from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";
import mapStyles from "./mapStyles";

function Map({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) {
  const [defaultCenterState, setDefaultCenterState] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coord: { latitude, longitude } }) =>
        setDefaultCenterState({ lat: latitude, lng: longitude })
    );
  }, []);

  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const changeMapCoordinatesHandler = (event) => {
    setCoordinates({ lng: event.center.lng, lat: event.center.lat });
    setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
  };

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultCenterState}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={changeMapCoordinatesHandler}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {places &&
          places.map((place, index) => (
            <div
              key={index}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              className={classes.markerContainer}
            >
              {isMobile ? (
                <LocationOnOutlined color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography gutterBottom variant="subtitle2">
                    {place?.name?.length > 10
                      ? `${place?.name?.substring(0, 10)}...`
                      : place?.name}
                  </Typography>
                  <img
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://media-cdn.tripadvisor.com/media/photo-s/1c/18/7f/03/we-bought-it-even-more.jpg"
                    }
                    className={classes.pointer}
                    alt={place.name}
                  />
                  {/* <Rating size="small" value={Number(place.rating)} readOnly /> */}
                </Paper>
              )}
            </div>
          ))}

        {weatherData?.list?.map((data, index) => (
          <div key={index} lat={data.coord.lat} lng={data.coord.lng}>
            <img
              src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              height={100}
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
