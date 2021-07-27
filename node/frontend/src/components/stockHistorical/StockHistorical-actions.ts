import { Dispatch } from "react";
import { format } from "date-fns";

import StockService from "../stock/Stock-service";

import { StockHistoricalReducerTypes } from "./StockHistorical-reducer";

const updateDate =
  (type: StockHistoricalReducerTypes) =>
  (dispatch: Dispatch<any>, value: Date) => {
    dispatch({
      type,
      payload: { dateFrom: value },
    });
  };

export const updateDatefrom = updateDate(
  StockHistoricalReducerTypes.UPDATE_DATE_FROM
);
export const updateDateTo = updateDate(
  StockHistoricalReducerTypes.UPDATE_DATE_TO
);

export interface getHistoricalParams {
  dateFrom: Date;
  dateTo: Date;
  stockName: string;
}
export const getHistorical =
  (service: StockService) =>
  async (
    dispatch: Dispatch<any>,
    { dateFrom, dateTo, stockName }: getHistoricalParams
  ) => {
    dispatch({ type: StockHistoricalReducerTypes.LOADING });
    try {
      const response = await service.getHistory(stockName, {
        from: format(dateFrom, "yyyy-MM-dd"),
        to: format(dateTo, "yyyy-MM-dd"),
      });

      dispatch({
        type: StockHistoricalReducerTypes.SUCCESS,
        payload: {
          data: response,
        },
      });
    } catch (error) {
      dispatch({
        type: StockHistoricalReducerTypes.ERROR,
        error,
      });
    }
  };
