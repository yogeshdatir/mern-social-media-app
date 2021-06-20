import express, { Request, Response } from "express";

import chartData from "../models/chartDataModel";
import LineChartData from "../models/lineChartDataModel";

const chartDataController = {
  getChartData: async (req: Request, res: Response) => {
    try {
      const data = await chartData.find();

      res.status(200).json({
        data,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  getLineChartData: async (req: Request, res: Response) => {
    try {
      const data = await LineChartData.find();

      res.status(200).json({
        data,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = chartDataController;
