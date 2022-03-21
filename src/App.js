import React from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/header/Header";
import SidePanel from "./components/sidePanel/SidePanel";
import Map from "./components/map/Map";

function App() {
  return (
    <>
      {/*  normalizes the styling of the project */}
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <SidePanel />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
