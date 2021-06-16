import express, { Request, Response } from "express";

import chartData from "../models/chartDataModel";

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
};

module.exports = chartDataController;
