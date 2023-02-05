import mongoose from "mongoose";
import { nanoid } from "nanoid";
const bcrypt = require("bcryptjs");
// return bcrypt.hashSync(val, 10);

const md5 = require("../middleware/utils/md5");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    set: (val: string) => md5(val),
    required: true,
    select: false,
  },
  sign: {
    type: String,
    default: null,
  },
  avator: {
    type: String,
    default: "null",
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  updateTime: {
    type: Date,
    default: Date.now,
  },
});
module.exports = userSchema;
