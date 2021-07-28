import React from "react";

import { Container, Grid, TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import StockProjectionCard from "./StockProjectionCard";

import { sucess } from "../../../mocks/projectionData.json";
function StockProjectionView() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={4}>
          <TextField
            id="standard-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <KeyboardDatePicker
            clearable
            value={new Date(Date.now())}
            onChange={console.log}
            label={"In"}
            // value={item.value ?? null}
            // label={item.label}
            placeholder="10/10/2018"
            // onChange={(date) => item.handler(date)}
            format="MM/dd/yyyy"
            showTodayButton
          />
        </Grid>
      </Grid>
      <StockProjectionCard
        inData={{
          pricedAt: new Date(sucess.purchasedAt),
          value: sucess.priceAtDate,
        }}
        last={{
          pricedAt: new Date(Date.now()),
          value: sucess.lastPrice,
        }}
        name={sucess.name}
        gains={sucess.capitalGains}
      />
    </Container>
  );
}

export default StockProjectionView;
