import express from "express";

const router = express.Router();

const {
  getChartData,
  getLineChartData,
} = require("../controllers/chartDataController");

router.get("/", getChartData);
router.get("/lineChartData", getLineChartData);

module.exports = router;
