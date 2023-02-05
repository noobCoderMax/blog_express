const mongoose = require("mongoose");
const {
  host,
  port,
  user,
  password,
  database,
  mongodbUrl,
} = require("../config/config.default");

// const mongodbUrl = `mongodb://${user}:${password}@${host}:${port}/${database}`;
const bsUrl = "mongodb://root:191427@localhost/blog?authSource=admin";

mongoose.connect(bsUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err: any) => {
  console.log("MongoDB 数据库连接失败！", err);
});

db.once("open", function () {
  console.log("MongoDB 数据库连接成功！");
});

// 组织导出模型构造函数/类
module.exports = {
  User: mongoose.model("user", require("./user")),
  Blog: mongoose.model("blog", require("./blog")),
};
