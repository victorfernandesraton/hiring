export interface StockHistoryInChart {
  name: string;
  color: string;
  data: StockHistoryItemInChart[];
}
export interface StockHistoryItemInChart {
  x: Date;
  y: number;
}

export const parseDataToHistoricalChart = (data: any): StockHistoryInChart => {
  return {
    name: data.name,
    color: "hsl(121, 70%, 50%)",
    data: [
      data.prices.map((item: any) => ({
        x: item.pricedAt,
        y: item.closing,
      })),
    ],
  };
};
