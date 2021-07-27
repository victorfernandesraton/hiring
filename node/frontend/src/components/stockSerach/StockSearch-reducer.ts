import { StockSearchItem } from "./StockSerach-service";

export enum StockSearchReducerTypes {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  UPDATE_QUERY = "UPDATE_QUERY",
}

export interface InitialStateType {
  data: StockSearchItem[];
  loading: boolean;
  eror: any;
  called: boolean;
  query: string;
}

export const initialState = {
  data: new Array<StockSearchItem>(),
  loading: false,
  called: false,
  error: null,
  query: "",
};
interface ReducerParams {
  type: StockSearchReducerTypes;
  payload?: any;
}
export default function Reducer(
  state = initialState,
  { type, payload }: ReducerParams
) {
  switch (type) {
    case StockSearchReducerTypes.LOADING:
      return { ...state, loading: true };
    case StockSearchReducerTypes.ERROR:
      return { ...state, error: payload?.error, loading: false };
    case StockSearchReducerTypes.SUCCESS:
      return {
        ...state,
        data: payload.data,
        loading: false,
        error: null,
        called: true,
      };
    case StockSearchReducerTypes.UPDATE_QUERY:
      return {
        ...state,
        query: payload.value,
      };
    default:
      return state;
  }
}
