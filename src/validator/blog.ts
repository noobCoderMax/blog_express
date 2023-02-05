const validate = require("../middleware/validate");
import { body, validationResult, param } from "express-validator";
const { User } = require("../model/index");
import mongoose, { Promise } from "mongoose";

exports.create = validate([
  body("title").notEmpty().withMessage("标题不能为空"),
  body("desc").notEmpty().withMessage("描述不能为空"),
  body("content").notEmpty().withMessage("内容不能为空"),
]);

exports.getBlog = validate([
  param("id").custom(async (id) => {
    if (!mongoose.isValidObjectId(id)) {
      return Promise.reject("文章ID不正确");
    }

    return true;
  }),
]);

exports.comment = [
  validate([body("comment").notEmpty().withMessage("评论不能为空")]),
  validate([
    body("email").custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return Promise.reject("用户不存在！");
      }
      return true;
    }),
  ]),
  validate([
    param("id").custom(async (id) => {
      if (!mongoose.isValidObjectId(id)) {
        return Promise.reject("文章ID不正确");
      }

      return true;
    }),
  ]),
];
