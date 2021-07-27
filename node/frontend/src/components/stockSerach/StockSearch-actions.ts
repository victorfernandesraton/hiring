import { Dispatch } from "react";
import StockSearchService from "./StockSerach-service";
import { StockSearchReducerTypes } from "./StockSearch-reducer";

export const updateQuery =
  (type: StockSearchReducerTypes) =>
  (dispatch: Dispatch<any>, value: string) => {
    dispatch({ type, payload: { value } });
  };

export const updateTextSearch = updateQuery(
  StockSearchReducerTypes.UPDATE_QUERY
);

export interface SerachStocksDispatchtypes {
  SUCESS: string;
  ERROR: string;
  LOADING: string;
}
export const serachStocks =
  (dispatchTypes: SerachStocksDispatchtypes, service: StockSearchService) =>
  async (dispatch: Dispatch<any>, value: string) => {
    dispatch({ type: dispatchTypes.LOADING });
    try {
      const result = await service.searchForString(value);

      dispatch({
        type: dispatchTypes.SUCESS,
        payload: { data: result },
      });
    } catch (error) {
      dispatch({ type: dispatchTypes.ERROR, error });
    }
  };
