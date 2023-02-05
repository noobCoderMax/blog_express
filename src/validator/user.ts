const validate = require("../middleware/validate");
import { body, validationResult } from "express-validator";
const { User } = require("../model/index");
const md5 = require("../middleware/utils/md5");

exports.register = validate([
  body("username")
    .notEmpty()
    .withMessage("用户名不能为空")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        return Promise.reject("用户名已存在！");
      }
    }),
  // password must be at least 5 chars long
  body("password")
    .notEmpty()
    .withMessage("密码不能为空")
    .isLength({ min: 6, max: 16 })
    .withMessage("密码最小长度为6，最大长度为16"),
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确")
    .bail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject("邮箱已存在！");
      }
    }),
]);

exports.login = [
  validate([
    body("email")
      .notEmpty()
      .withMessage("邮箱不能为空")
      .isEmail()
      .withMessage("邮箱格式不正确"),
    body("password")
      .notEmpty()
      .withMessage("密码不能为空")
      .isLength({ min: 6, max: 16 })
      .withMessage("密码格式不正确！"),
    body("svgCode").notEmpty().withMessage("验证码不能为空"),
  ]),
  validate([
    body("email").custom(async (email, { req }) => {
      const user = await User.findOne({ email }).select([
        "password",
        "username",
        "email",
        "sign",
        "avator",
        "_id",
      ]);
      if (!user) {
        return Promise.reject("用户不存在！");
      }
      req.user = user;
    }),
  ]),
  validate([
    body("password").custom((password, { req }) => {
      if (md5(password) !== req.user.password.trim()) {
        return Promise.reject("密码错误！");
      }
      return true;
    }),
  ]),
  validate([
    body("svgCode").custom((svgCode: string, { req }) => {
      console.log("req.session" + new Date(), req.session);
      console.log("req.body" + new Date(), req.body);
      if (svgCode.toLowerCase() !== req.session.svgCode) {
        return Promise.reject("验证码错误！");
      }
      return true;
    }),
  ]),
];

exports.updatePsw = [
  validate([
    body("email")
      .notEmpty()
      .withMessage("邮箱不能为空")
      .isEmail()
      .withMessage("邮箱格式不正确"),
    body("password").notEmpty().withMessage("密码不能为空"),
  ]),
  validate([
    body("email").custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return Promise.reject("用户不存在！");
      }
      return true;
    }),
  ]),
];

exports.updateInfo = [
  validate([
    body("email")
      .notEmpty()
      .withMessage("邮箱不能为空")
      .isEmail()
      .withMessage("邮箱格式不正确"),
  ]),
  validate([
    body("email").custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return Promise.reject("用户不存在！");
      }
      return true;
    }),
  ]),
];
