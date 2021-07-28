import React, { useCallback, useEffect, useReducer } from "react";

import {
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";

import StockProjectionCard from "./StockProjectionCard";

import Reducer, { InitialState } from "./StockProjection-reducer";
import {
  getProjectionAction,
  getProjectionParams,
  updateAmmount,
  updateDate,
} from "./stockProjection-actions";

export interface StockProjectionViewProps {
  name: string;
}
function StockProjectionView({ name }: StockProjectionViewProps) {
  const [{ dateFrom, loading, called, error, ammount, data }, dispatch] =
    useReducer(Reducer, InitialState);

  const getProjection = useCallback(
    async (params: getProjectionParams) =>
      getProjectionAction(dispatch, params),
    []
  );

  const onDateChange = useCallback((value: Date) => {
    updateDate(dispatch, value);
  }, []);
  const onAmmountChange = useCallback((value: number) => {
    updateAmmount(dispatch, value);
  }, []);

  useEffect(() => {
    if (!loading && ammount && dateFrom) {
      console.log(loading);
      //     getProjection({
      //       ammount,
      //       stockName: name,
      //       date: dateFrom,
      //     });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFrom, ammount, loading, name]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={4}>
          <TextField
            value={ammount}
            onChange={(e) => onAmmountChange(parseInt(e.target.value))}
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
            value={dateFrom}
            label={"In"}
            placeholder="10/10/2018"
            onChange={(date) => {
              if (date instanceof Date) {
                onDateChange(date);
              }
            }}
            format="dd/MM/yyyy"
            showTodayButton
          />
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {called && data && (
            <StockProjectionCard
              inData={{
                pricedAt: new Date(data.purchasedAt),
                value: data.priceAtDate,
              }}
              last={{
                pricedAt: new Date(Date.now()),
                value: data.lastPrice,
              }}
              name={data.name}
              gains={data.capitalGains}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default StockProjectionView;
