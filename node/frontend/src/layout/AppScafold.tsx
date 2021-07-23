/* eslint-disable react/display-name */
import React from "react";

import AppBarProvider from "../components/AppBar/AppBar-context";
import AppBar from "../components/AppBar/";

export const withAppScafold =
  <P extends object>(Component: React.ComponentType<P>) =>
  ({ ...props }: P) =>
    (
      <AppBarProvider>
        <AppBar />
        <Component {...props} />
      </AppBarProvider>
    );
