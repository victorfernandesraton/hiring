import React, { useCallback, useReducer } from "react";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";

import Reducer, {
  InitialState,
  StockHistoricalReducerTypes,
} from "./StockHistorical-reducer";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();
  const [{ loading, called, error, data, dateFrom, dateTo }, dispatch] =
    useReducer(Reducer, InitialState);

  const handleChangeDateFrom = useCallback((value) => {
    dispatch({
      type: StockHistoricalReducerTypes.UPDATE_DATE_FROM,
      payload: { dateFrom: value },
    });
  }, []);

  const handleChangeDateTo = useCallback((value) => {
    dispatch({
      type: StockHistoricalReducerTypes.UPDATE_DATE_TO,
      payload: { dateTo: value },
    });
  }, []);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <KeyboardDatePicker
          clearable
          value={dateFrom ?? new Date()}
          label="De"
          placeholder="10/10/2018"
          onChange={(date) => handleChangeDateFrom(date)}
          format="MM/dd/yyyy"
        />
        <KeyboardDatePicker
          clearable
          label="Até"
          value={dateTo ?? new Date()}
          placeholder="10/10/2018"
          onChange={(date) => handleChangeDateTo(date)}
          format="MM/dd/yyyy"
        />
      </CardContent>
    </Card>
  );
}
