import React, { useCallback, useReducer, useEffect, useMemo } from "react";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";

import StockService from "../stock/Stock-service";
import StockRequests from "../stock/Stock-requests";
import Reducer, { InitialState } from "./StockHistorical-reducer";

import StockHistoricalChart from "./StockHistoricalChard";
import { parseDataToHistoricalChart } from "./StockHistorical-utils";
import {
  getHistorical,
  updateDatefrom,
  updateDateTo,
} from "./StockHistorical-actions";

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

export interface StockHistoricalProps {
  stockName: string;
}

export default function StockHistorical({ stockName }: StockHistoricalProps) {
  const classes = useStyles();
  const [{ loading, called, error, data, dateFrom, dateTo }, dispatch] =
    useReducer(Reducer, InitialState);

  const stockServiceInstance = useMemo(
    () =>
      new StockService({
        request: {
          get: StockRequests.get,
          post: StockRequests.post,
        },
      }),
    []
  );
  const handleChangeDateFrom = useCallback((value) => {
    updateDatefrom(dispatch, value);
  }, []);

  const handleChangeDateTo = useCallback((value) => {
    updateDateTo(dispatch, value);
  }, []);

  const getHistoricalData = useCallback(
    async ({ dateFrom, dateTo, stockName }) => {
      getHistorical(stockServiceInstance)(dispatch, {
        dateFrom,
        dateTo,
        stockName,
      });
    },
    [stockServiceInstance]
  );

  useEffect(() => {
    if (dateFrom != dateTo && dateFrom && dateTo) {
      getHistoricalData({
        dateFrom,
        dateTo,
        stockName,
      });
    }
  }, [dateFrom, dateTo, getHistoricalData, stockName]);

  return (
    <>
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
      <CardContent>
        {data?.length > 0 && (
          <StockHistoricalChart
            {...parseDataToHistoricalChart({
              prices: data,
              name: stockName,
            })}
          />
        )}
      </CardContent>
    </>
  );
}
