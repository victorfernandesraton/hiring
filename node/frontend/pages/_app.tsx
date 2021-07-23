import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import DateFnsUtils from "@date-io/date-fns";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../src/thene";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
}
