import { NextFunction, Request, Response } from "express";

module.exports = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!(<any>req).files || Object.keys((<any>req).files).length === 0)
      return res.status(400).json({ msg: "No files were uploaded." });

    const file: any = (<any>req).files.file;

    if (file.size > 1024 * 1024 * 5) {
      return res.status(400).json({ msg: "Size too large." });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      return res.status(400).json({ msg: "File format is incorrect." });
    }

    next();
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong." });
  }
};
