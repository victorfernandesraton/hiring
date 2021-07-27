import { initialState } from "../stock/Stock-reducer";
import { StockHistoryinterval, StockInfo } from "../stock/Stock-service";

export enum StockHistoricalReducerTypes {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  UPDATE_DATE_FROM = "UPDATE_DATE_FROM",
  UPDATE_DATE_TO = "UPDATE_DATE_TO",
}

export interface InitialStateType extends StockHistoryinterval {
  data: StockInfo[];
  loading: boolean;
  eror: any;
  called: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}

export const InitialState = {
  data: new Array<StockInfo>(),
  loading: false,
  called: false,
  error: null,
  dateFrom: null,
  dateTo: null,
};
interface ReducerParams {
  type: StockHistoricalReducerTypes;
  payload?: any;
}
export default function Reducer(
  state = InitialState,
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
    case StockHistoricalReducerTypes.UPDATE_DATE_FROM:
    case StockHistoricalReducerTypes.UPDATE_DATE_TO: {
      return {
        ...state,
        dateFrom: payload?.dateFrom ?? state.dateFrom,
        dateTo: payload.dateTo ?? state.dateTo,
      };
    }
    default:
      return state;
  }
}
