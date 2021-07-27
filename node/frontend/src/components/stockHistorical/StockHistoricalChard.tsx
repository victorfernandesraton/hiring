import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const StockHistoricalChart = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotoneX" dataKey="y" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="x" />
      <YAxis dataKey="y" />
    </LineChart>
  );
};

export default StockHistoricalChart;
