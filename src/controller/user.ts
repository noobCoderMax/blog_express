import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
const { User } = require("../model/index");
const { sendEmail } = require("node-send-email");
const { jwtSecret } = require("../config/config.default");
const qnConfig = require("../middleware/utils/qiniuyun");
const jwt = require("../middleware/utils/jwt");

// 用户注册
exports.register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // res.status(200).send("用户注册");
    let user = new User(req.body);
    await user.save();
    user = user.toJSON();
    delete user.password;
    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

// 用户登录(邮箱+密码)
exports.login = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user.toJSON();
    const token = await jwt.jwtSighSync(
      {
        userId: user._id,
      },
      jwtSecret,
      { expiresIn: 60 * 60 * 24 }
    );

    delete user.password;

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// 用户登录(邮箱+验证码)
exports.loginCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send(" 用户登录(邮箱+验证码)");
  } catch (error) {
    next(error);
  }
};

// 修改用户信息
exports.updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    User.findOneAndUpdate(
      { email: req.body.email },
      {
        sign: req.body.sign,
        avator: req.body.avator,
        username: req.body.username,
      },
      { new: true }
    )
      .then((rs: any) => {
        res
          .status(201)
          .json({
            msg: "修改密码成功！",
            data: rs,
          })
          .end();
      })
      .catch((err: Error) => {
        res
          .status(500)
          .json({
            msg: "修改密码失败！",
            data: null,
          })
          .end();
      });
  } catch (error) {
    next(error);
  }
};

// 获取当前用户
exports.getCurrentUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// 根据id查询用户
exports.getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send("根据ID查询用户");
  } catch (error) {
    next(error);
  }
};

// 删除用户信息
exports.deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send("根据ID删除用户");
  } catch (error) {
    next(error);
  }
};

// 添加用户
exports.addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send("添加用户");
  } catch (error) {
    next(error);
  }
};

// 分页查询
exports.getUserByPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send("分页查询");
  } catch (error) {
    next(error);
  }
};

// 修改密码
exports.updatePwd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    User.findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.password },
      { new: true }
    )
      .then((rs: any) => {
        res
          .status(201)
          .json({
            msg: "修改密码成功！",
            data: rs,
          })
          .end();
      })
      .catch((err: Error) => {
        res
          .status(500)
          .json({
            msg: "修改密码失败！",
            data: null,
          })
          .end();
      });
  } catch (error) {
    next(error);
  }
};

// 获取邮箱验证码
exports.getEmailCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, "0"); //生成随机验证码

    const userEmail = req.body.email;

    console.log("邮箱");

    const params = {
      //邮箱类型，@qq.com就传qq，@163.com就是传163，不传的话默认为qq，
      //其余类型可以在node_modules/node-send-email/lib/service.js中找到。
      type: "qq",
      // 发件人
      name: "小佳博客",
      // 发件箱，要与收件箱邮箱类型一致
      from: "1914275425@qq.com",
      // 发件箱smtp,需要去邮箱—设置–账户–POP3/SMTP服务—开启—获取stmp授权码
      smtp: "gcmkvsvdvrocfbaf",
      // 发送的邮件标题
      subject: "邮箱验证码",
      // 收件箱，要与发件箱邮箱类型一致
      to: userEmail,
      // 邮件内容，HTML格式
      html: `
          <p>您好！</p>
          <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
          <p>如果不是您本人操作，请无视此邮件</p>
      `,
    };

    await sendEmail(params, (result: any) => {
      if (result) {
        res.status(200).send({ code: 1, msg: "发送验证码成功" });
      } else {
        res.status(500).send({ code: 0, msg: "发送验证码失败，请稍后重试" });
      }
    });
  } catch (error) {
    next(error);
  }
};
