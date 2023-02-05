import { NextFunction, Request, Response } from "express";
const qnConfig = require("../middleware/utils/qiniuyun");

exports.qiniuTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send("qiniu-Test");
  } catch (error) {
    next(error);
  }
};

exports.qiniuToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send(qnConfig.uploadToken);
  } catch (error) {
    next(error);
  }
};
