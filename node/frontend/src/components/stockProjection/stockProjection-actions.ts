import { Dispatch } from "react";
import StockRequests from "../stock/Stock-requests";
import StockProjectionService from "./StockPorjection-service";
import { StockProjectionReducerTypes } from "./StockProjection-reducer";

export interface getProjectionParams {
  ammount: number;
  stockName: string;
  date: Date;
}
export const getProjectionFactory =
  (service: StockProjectionService) =>
  async (
    dispatch: Dispatch<any>,
    { ammount, stockName, date }: getProjectionParams
  ) => {
    dispatch({ type: StockProjectionReducerTypes.LOADING });
    try {
      const request = await service.getProjection(stockName, date, ammount);

      dispatch({
        type: StockProjectionReducerTypes.SUCCESS,
        payload: {
          value: {
            ...request,
          },
        },
      });
    } catch (error) {
      dispatch({
        type: StockProjectionReducerTypes.ERROR,
        payload: { error },
      });
    }
  };

export const updateDate = (dispatch: Dispatch<any>, value: Date) => {
  dispatch({
    type: StockProjectionReducerTypes.UPDATE_DATE_FROM,
    payload: { value },
  });
};
export const updateAmmount = (dispatch: Dispatch<any>, value: number) => {
  dispatch({
    type: StockProjectionReducerTypes.UPDATE_AMMOUNT,
    payload: { value },
  });
};

export const getProjectionAction = getProjectionFactory(
  new StockProjectionService(StockRequests)
);
