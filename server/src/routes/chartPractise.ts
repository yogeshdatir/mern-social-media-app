import express from "express";

const router = express.Router();

const { getChartData } = require("../controllers/chartDataController");

router.get("/", getChartData);

module.exports = router;
