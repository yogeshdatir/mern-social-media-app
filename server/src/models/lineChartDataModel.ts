const mongoose = require("mongoose");

const lineChartDataSchema = mongoose.Schema({
  date: {
    type: String,
  },
  open: {
    type: Number,
  },
  close: {
    type: Number,
  },
  high: {
    type: Number,
  },
  adj_close: {
    type: Number,
  },
  volume: {
    type: Number,
  },
});

export default mongoose.model(
  "LineChartData",
  lineChartDataSchema,
  "stock_prices_historical"
);
