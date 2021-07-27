import { memo } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

export interface StockHistoricalChartItem {
  x: Date;
  y: number;
}
export interface StockHistoricalChartProps {
  data: StockHistoricalChartItem[];
  name: string;
}
const StockHistoricalChart = ({ data, name }: StockHistoricalChartProps) => (
  <LineChart width={600} height={300} data={data}>
    <Line type="monotoneX" dataKey="y" stroke="#8884d8" name={name} />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="x" />
    <YAxis dataKey="y" />
  </LineChart>
);

export default memo(StockHistoricalChart);
