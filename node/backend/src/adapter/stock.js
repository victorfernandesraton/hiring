import { gerProximityDate, verifyDateInInterval } from "./timer.js";

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

export const parseProjectionFromDay = ({ historical, date }) => {
  const priceListDate = Object.keys(historical);
  const proximityDate = gerProximityDate({
    target: new Date(date),
    dates: priceListDate.map((date) => new Date(date)),
  });

  const historicalPrice =
    parseFloat(historical[priceListDate[proximityDate]]?.["4. close"]) ?? 0;
  return {
    purchasedAt: priceListDate[proximityDate],
    priceAtDate: historicalPrice,
  };
};

export const parseSearchResults = (response = []) => {
  return {
    data: response.map((item) => ({
      name: item?.["2. name"] ?? "",
      type: item?.["3. type"] ?? "",
      symbol: item?.["1. symbol"] ?? "",
    })),
  };
};
