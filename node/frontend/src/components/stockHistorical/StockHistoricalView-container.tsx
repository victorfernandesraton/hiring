import React, { useCallback, useReducer, useEffect, useMemo } from "react";
import { differenceInDays } from "date-fns";

import {
  CardContent,
  Typography,
  CircularProgress,
  Card,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { KeyboardDatePicker } from "@material-ui/pickers";

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
    if (differenceInDays(dateFrom, dateTo) != 0 && dateFrom && dateTo) {
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
          {[
            { value: dateFrom, handler: handleChangeDateFrom, label: "From" },
            {
              value: dateTo,
              handler: handleChangeDateTo,
              label: "To",
            },
          ].map((item) => (
            <>
              <KeyboardDatePicker
                clearable
                value={item.value ?? null}
                label={item.label}
                placeholder="10/10/2018"
                onChange={(date) => item.handler(date)}
                format="MM/dd/yyyy"
                showTodayButton
              />
            </>
          ))}
        </CardContent>
      </Card>
      <CardContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {data?.length > 0 && called ? (
              <StockHistoricalChart
                {...parseDataToHistoricalChart({
                  prices: data,
                  name: stockName,
                })}
              />
            ) : (
              <Typography variant="h2">Selecione uma data válida</Typography>
            )}
          </>
        )}
      </CardContent>
    </>
  );
}
