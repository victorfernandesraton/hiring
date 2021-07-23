import { StockReducerTypes } from "./Stock-reducer";
import StockRequests from "./Stock-requests";
import StockService, { StockQuota } from "./Stock-service";

export const stockServiceInstance = new StockService({
  request: {
    get: StockRequests.get,
    post: StockRequests.post,
  },
});
export const getStockData = async (
  dispatch: (arg0: {
    type: StockReducerTypes;
    payload?: { data: StockQuota };
    error?: any;
  }) => void,
  { name = "" }: any
) => {
  dispatch({ type: StockReducerTypes.LOADING });
  try {
    const response = await stockServiceInstance.getLastQuota(name);
    dispatch({ type: StockReducerTypes.SUCCESS, payload: { data: response } });
  } catch (error) {
    dispatch({ type: StockReducerTypes.ERROR, error });
  }
};
