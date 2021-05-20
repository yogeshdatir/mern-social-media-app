import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = (<any>req).headers.Authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData: any;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");

      (<any>req).userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      (<any>req).userId = decodedData?.sub;
    }

    next();
  } catch (error: any) {
    res.status(400).json({ message: "Invalid credentials." });
  }
};

module.exports = auth;