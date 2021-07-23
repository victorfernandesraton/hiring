/* eslint-disable react/display-name */
import React from "react";

import AppBarProvider from "../components/AppBar/AppBar-context";
import AppBar from "../components/AppBar/";
import { Container, Grid } from "@material-ui/core";

export const withAppScafold =
  <P extends object>(Component: React.ComponentType<P>) =>
  ({ ...props }: P) =>
    (
      <AppBarProvider>
        <AppBar />
        <Container>
          <Component {...props} />
        </Container>
      </AppBarProvider>
    );
