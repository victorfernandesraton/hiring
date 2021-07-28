export interface InitialStateType {
  loading: boolean;
  called: boolean;
  error: any;
  base: string;
  data: string[];
}

export enum StockCompareReducerTypes {
  SUCESS = "SUCESS",
  LOADING = "LOADING",
  ERROR = "ERROR",
  ADD_TIP = "ADD_TIP",
  REMOVE_TIP = "REMOVE_TIP",
  UPDATE_BASE = "UPDATE_BASE",
}

export const initialState = {
  loading: false,
  called: false,
  error: null,
  base: null,
  data: new Array<string>(),
};

export interface ReducerParams {
  type: StockCompareReducerTypes;
  payload: any;
}

const Reducer = (state = initialState, { type, payload }: ReducerParams) => {
  switch (type) {
    case StockCompareReducerTypes.LOADING:
      return { ...state, loading: true };
    case StockCompareReducerTypes.ERROR:
      return { ...state, error: payload?.error, loading: false };
    case StockCompareReducerTypes.ADD_TIP:
      return {
        ...state,
        data: [
          ...state.data.filter((item) => item != payload.value),
          payload.value,
        ],
        called: true,
        loading: false,
      };
    case StockCompareReducerTypes.REMOVE_TIP:
      return {
        ...state,
        data: state.data.filter((item) => item != payload.value),
        called: true,
        loading: false,
      };
    case StockCompareReducerTypes.UPDATE_BASE:
      return {
        ...state,
        called: true,
        loading: false,
        base: payload.value,
        data: state.data.filter((item) => item != payload.value),
      };

    default:
      return state;
  }
};

export default Reducer;
