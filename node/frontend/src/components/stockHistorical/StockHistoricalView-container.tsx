import React, { useCallback, useReducer, useEffect } from "react";
import { format } from "date-fns";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";

import StockService from "../stock/Stock-service";
import StockRequests from "../stock/Stock-requests";
import Reducer, {
  InitialState,
  StockHistoricalReducerTypes,
} from "./StockHistorical-reducer";

import StockHistoricalChart from "./StockHistoricalChard";
import { parseDataToHistoricalChart } from "./StockHistorical-utils";

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

  const getHistorical = useCallback(
    async ({ dateFrom, dateTo }) => {
      dispatch({ type: StockHistoricalReducerTypes.LOADING });
      const stockServiceInstance = new StockService({
        request: {
          get: StockRequests.get,
          post: StockRequests.post,
        },
      });
      const response = await stockServiceInstance.getHistory(stockName, {
        from: dateFrom,
        to: dateTo,
      });

      dispatch({
        type: StockHistoricalReducerTypes.SUCCESS,
        payload: {
          data: response,
        },
      });
    },
    [loading, error]
  );

  useEffect(() => {
    if (dateFrom != dateTo && dateFrom && dateTo) {
      getHistorical({
        dateFrom: format(dateFrom, "yyyy-MM-dd"),
        dateTo: format(dateTo, "yyyy-MM-dd"),
      });
    }
  }, [dateFrom, dateTo]);

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
        {data?.length && (
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
