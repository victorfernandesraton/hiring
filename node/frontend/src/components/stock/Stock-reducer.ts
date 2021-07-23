export enum StockReducerTypes {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface initialStateType {
  loading: boolean;
  called: boolean;
  data: {};
  error: any;
}

interface ReducerParams {
  type: StockReducerTypes;
  payload?: any;
}

export const initialState = {
  loading: false,
  called: false,
  data: {},
  error: null,
};

function Reducer(state = initialState, { type, payload }: ReducerParams) {
  switch (type) {
    case StockReducerTypes.LOADING:
      return { ...state, loading: true };
    case StockReducerTypes.ERROR:
      return { ...state, error: payload?.error, loading: false };
    case StockReducerTypes.SUCCESS:
      return {
        ...state,
        error: null,
        data: payload.data,
        loading: false,
        called: true,
      };
    default:
      return state;
  }
}

export default Reducer;
