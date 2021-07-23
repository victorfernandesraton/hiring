import axios from "axios";

const applyRoutes = (endpoint: string) => (stockName: string) =>
  `/stocks/${stockName}/${endpoint}`;

export const quota = applyRoutes("quote");
export const historic = applyRoutes("history");
export const gains = applyRoutes("gains");
export const compare = applyRoutes("compare");

export default axios.create({
  baseURL: "http://localhost:8000",
});
