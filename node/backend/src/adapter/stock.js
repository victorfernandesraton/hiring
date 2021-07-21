export const parseLastStockResponse = ({ stockName, result }) => {
  const price = result?.data?.["Global Quote"]?.["05. price"];
  const date = result?.data?.["Global Quote"]?.["07. latest trading day"];

  return {
    name: stockName,
    lastPrice: price ? parseFloat(price) : 0,
    priceAt: new Date(date).toISOString(),
  };
};

export const parseHistoricalStockResponse = ({ stockName, result = [] }) => ({
  name: stockName,
  prices: result.length
    ? result?.map?.((price) => ({
        opening: price?.open ?? 0,
        low: price?.low,
        high: price?.high ?? 0,
        closing: price?.close ?? 0,
        pricedAt: price?.date,
      }))
    : [],
});

export const parseCompareStockResponse = (stocks = []) => ({
  prices: stocks,
});
