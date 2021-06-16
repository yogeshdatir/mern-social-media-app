const mongoose = require("mongoose");

const chartDataSchema = mongoose.Schema({
  name: {
    type: String,
  },
  amt: {
    type: String,
  },
  pv: {
    type: String,
  },
  uv: {
    type: String,
  },
});

export default mongoose.model("chartData", chartDataSchema, "chartData");
