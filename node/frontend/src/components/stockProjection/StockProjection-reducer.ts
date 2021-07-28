import { StockProjectionResponse } from "./StockPorjection-service";

export enum StockProjectionReducerTypes {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  UPDATE_DATE_FROM = "UPDATE_DATE_FROM",
  UPDATE_AMMOUNT = "UPDATE_ammount",
}

export interface InitialStateType {
  data?: StockProjectionResponse | null;
  loading: boolean;
  eror: any;
  called: boolean;
  dateFrom?: Date | null;
  ammount?: number;
}

export const InitialState = {
  data: null,
  loading: false,
  called: false,
  error: null,
  dateFrom: null,
  ammount: 0,
};
interface ReducerParams {
  type: StockProjectionReducerTypes;
  payload?: any;
}
export default function Reducer(
  state = InitialState,
  { type, payload }: ReducerParams
) {
  switch (type) {
    case StockProjectionReducerTypes.LOADING:
      return { ...state, loading: true };
    case StockProjectionReducerTypes.ERROR:
      return { ...state, error: payload?.error, loading: false };
    case StockProjectionReducerTypes.SUCCESS:
      return {
        ...state,
        data: payload.data,
        loading: false,
        error: null,
        called: true,
      };
    case StockProjectionReducerTypes.UPDATE_DATE_FROM:
      return {
        ...state,
        dateFrom: payload?.value,
      };
    case StockProjectionReducerTypes.UPDATE_AMMOUNT:
      return { ...state, ammount: payload.value };
    default:
      return state;
  }
}
