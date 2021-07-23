import { initialState } from "../stock/Stock-reducer";
import { StockHistoryinterval, StockInfo } from "../stock/Stock-service";

export enum StockHistoricalReducerTypes {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface InitialStateType extends StockHistoryinterval {
  data: StockInfo[];
  loading: boolean;
  eror: any;
  called: boolean;
}

export const InitialState = {
  data: new Array<StockInfo>(),
  loading: false,
  called: false,
  error: null,
};
interface ReducerParams {
  type: StockHistoricalReducerTypes;
  payload?: any;
}
export default function Reducer(
  state = initialState,
  { type, payload }: ReducerParams
) {
  switch (type) {
    case StockHistoricalReducerTypes.LOADING:
      return { ...state, loading: true };
    case StockHistoricalReducerTypes.ERROR:
      return { ...state, error: payload?.error, loading: false };
    case StockHistoricalReducerTypes.SUCCESS:
      return {
        ...state,
        data: payload.data,
        loading: false,
        error: null,
        called: true,
      };
    default:
      return state;
  }
}
