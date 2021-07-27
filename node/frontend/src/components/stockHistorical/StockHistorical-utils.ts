export interface StockHistoryInChart {
  name: string;
  data: StockHistoryItemInChart[];
}
export interface StockHistoryItemInChart {
  x: Date;
  y: number;
}

export const parseDataToHistoricalChart = (data: any): StockHistoryInChart => ({
  name: data.name,
  data: data.prices
    .map((item: any) => ({
      x: item.pricedAt,
      y: item.closing,
    }))
    .sort((a: any, b: any) => b.y - a.y),
});
