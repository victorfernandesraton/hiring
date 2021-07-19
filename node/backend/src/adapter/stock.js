export const parseLastStockResponse = ({ stockName, result }) => {
  const price = result?.data?.["Global Quote"]?.["05. price"];
  const date = result?.data?.["Global Quote"]?.["07. latest trading day"];

  return {
    name: stockName,
    lastPrice: price ? parseFloat(price) : 0,
    priceAt: new Date(date).toISOString(),
  };
};
