import axios from "axios";

const applyRoutes = (endpoint: string) => (stockName: string) =>
  `/stocks/${stockName}/${endpoint}`;

export const quota = applyRoutes("quota");
export const historic = applyRoutes("history");
export const gains = applyRoutes("gains");
export const compare = applyRoutes("compare");

export default axios.create({
  baseURL: process.env.API,
});
