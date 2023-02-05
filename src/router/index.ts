import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

router.use("/user", require("./user"));
router.use("/blog", require("./blogs"));

module.exports = router;
