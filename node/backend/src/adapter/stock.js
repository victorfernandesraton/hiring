import { verifyDateInInterval } from "./timer.js";

export const parseLastStockResponse = ({ stockName, result }) => {
  const price = result?.data?.["Global Quote"]?.["05. price"];
  const date = result?.data?.["Global Quote"]?.["07. latest trading day"];

  return {
    name: stockName,
    lastPrice: price ? parseFloat(price) : 0,
    priceAt: new Date(date).toISOString(),
  };
};

export const parseHistoricalStockResponse = ({
  stockName,
  initialDate,
  finalDate,
  result = {},
}) => {
  const priceListDate = Object.keys(result).filter((data) =>
    verifyDateInInterval({
      finalDate,
      initialDate,
      target: data,
    })
  );

  const prices = priceListDate
    .map((date) => {
      if (result?.[date]) {
        return {
          opening: parseFloat(result?.[date]?.["1. open"]) ?? 0,
          high: parseFloat(result?.[date]?.["2. high"]) ?? 0,
          low: parseFloat(result?.[date]?.["3. low"]) ?? 0,
          closing: parseFloat(result?.[date]?.["4. close"]) ?? 0,
          pricedAt: date,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

  return {
    name: stockName,
    prices,
  };
};

export const parseCompareStockResponse = (stocks = []) => ({
  prices: stocks,
});
