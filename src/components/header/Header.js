import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

function Header({ setCoordinates }) {
  const [autoCompleteState, setAutoCompleteState] = useState(null);
  const classes = useStyles();

  const onLoadHandler = (autoComplete) => {
    setAutoCompleteState(autoComplete);
  };

  const onPlaceChangedHandler = () => {
    const lat = autoCompleteState.getPlace().geometry.location.lat();
    const lng = autoCompleteState.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Companion
        </Typography>
        <Box display={"flex"}>
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete
            onLoad={onLoadHandler}
            onPlaceChanged={onPlaceChangedHandler}
          >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
