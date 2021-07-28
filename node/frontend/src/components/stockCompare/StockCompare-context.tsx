import React, { useReducer, createContext, useContext } from "react";
import { useCallback } from "react";
import { StockInfo } from "../stock/Stock-service";
import Reducer, {
  initialState,
  InitialStateType,
  StockCompareReducerTypes,
} from "./StockCompare-reducer";

export interface StockCompareContextType {
  data: string[];
  addTip: (tip: string) => void;
  removeTip: (tip: string) => void;
  addBase: (value: string) => void;
  base: string | null;
}
const StockCompareContext = createContext({
  data: new Array<string>(),
  base: null,
  addTip: (tip: string) => {},
  removeTip: (tip: string) => {},
  addBase: (value: string) => {},
} as StockCompareContextType);
const StockCompareContextProvider: React.FC = ({ children }) => {
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
  return (
    <StockCompareContext.Provider
      value={{ data: state.data, addTip, removeTip, addBase, base: state.base }}
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
