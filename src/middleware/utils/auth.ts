import { NextFunction, Request, Response } from "express";
const jwt = require("../utils/jwt");
const { jwtSecret } = require("../../config/config.default");
const { User } = require("../../model");

module.exports = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  // 从请求头获取token
  let token: string = req.header("authorization");
  token = token ? token.split("Bearer")[1].trim() : "";
  if (!token && token === "") {
    // 无效400
    return res
      .status(401)
      .json({
        msg: "token过期，请登录后再访问！",
      })
      .end();
  }

  // 验证是否有效
  try {
    const decodeToken = await jwt.jwtVerify(token, jwtSecret);
    // 有效则将用户信息挂载到req对象上，继续往后执行 next
    req.user = await User.findById(decodeToken.userId);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        msg: "用户未登录，请登录后再访问！",
      })
      .end();
  }
};
