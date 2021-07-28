import React, { useReducer, createContext, useContext } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import StockRequests from "../stock/Stock-requests";
import { StockQuota } from "../stock/Stock-service";
import Reducer, {
  initialState,
  InitialStateType,
  StockCompareReducerTypes,
} from "./StockCompare-reducer";
import StockCompareService from "./StockCompare-service";

export interface StockCompareContextType {
  data: string[];
  addTip: (tip: string) => void;
  removeTip: (tip: string) => void;
  addBase: (value: string) => void;
  getCompare: () => void;
  base: string | null;
  result: StockQuota[];
}
const StockCompareContext = createContext({
  data: new Array<string>(),
  base: null,
  addTip: (tip: string) => {},
  removeTip: (tip: string) => {},
  addBase: (value: string) => {},
  getCompare: () => {},
  result: new Array<StockQuota>(),
} as StockCompareContextType);
const StockCompareContextProvider: React.FC = ({ children }) => {
  const service = useMemo(() => new StockCompareService(StockRequests), []);
  const [state, dispatch] = useReducer(Reducer, initialState);

  const addTip = useCallback((tip: string) => {
    dispatch({
      type: StockCompareReducerTypes.ADD_TIP,
      payload: { value: tip },
    });
  }, []);

  const removeTip = useCallback((tip: string) => {
    dispatch({
      type: StockCompareReducerTypes.REMOVE_TIP,
      payload: { value: tip },
    });
  }, []);

  const addBase = useCallback((value: string) => {
    dispatch({
      type: StockCompareReducerTypes.UPDATE_BASE,
      payload: { value },
    });
  }, []);

  const getCompare = useCallback(async () => {
    dispatch({
      type: StockCompareReducerTypes.LOADING,
    });

    try {
      const response = await service.getCompare(state.base, state.data);

      dispatch({
        type: StockCompareReducerTypes.SUCESS,
        payload: { value: response },
      });
    } catch (error) {
      dispatch({
        type: StockCompareReducerTypes.ERROR,
        payload: { error },
      });
    }
  }, [state.base, state.data.length, service]);
  return (
    <StockCompareContext.Provider
      value={{
        data: state.data,
        addTip,
        removeTip,
        addBase,
        base: state.base,
        getCompare,
        result: state.result,
      }}
    >
      {children}
    </StockCompareContext.Provider>
  );
};

export const withStockCompareContext =
  <P extends object>(Component: React.ComponentType<P>) =>
  // eslint-disable-next-line react/display-name
  ({ ...props }: P) =>
    (
      <StockCompareContextProvider>
        <Component {...props} />
      </StockCompareContextProvider>
    );

export const useStockCompare = () => useContext(StockCompareContext);

export default StockCompareContextProvider;
