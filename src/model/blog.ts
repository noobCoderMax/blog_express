import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = require("../model/user");
const { User } = require("./index");
mongoose.model("User", userSchema);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    default: null,
  },
  desc: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  updateTime: {
    type: Date,
    default: Date.now,
  },
  tagList: {
    type: Array<string>,
    default: null,
  },
  like: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = blogSchema;
