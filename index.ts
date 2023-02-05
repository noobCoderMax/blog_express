import express, { Express, NextFunction, Request, Response } from "express";
const app: Express = express();
const session = require("express-session");
const routerApi = require("./src/router/api");
const routerBlog = require("./src/router/blogs");
const routerUser = require("./src/router/user");
const db = require("./src/model/index");
const cros = require("cors");
db;

let corsOptions = {
  origin: "http://localhost:8080",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  maxAge: 60 * 60,
  // allowedHeaders: "*",
  // exposedHeaders: ["Content-Range", "X-Content-Range"],
};

// 跨域
app.use(cros(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

app.use(
  session({
    secret: "test", //服务器生成 session 签名，可以随意写
    resave: true, //强制保存 session 即使它没有变化，不配置会有提示
    saveUninitialized: true, //强制将未初始化的 session 存储
    cookie: {
      maxAge: 1000 * 60 * 60,
      // secure: false, //设置为true，表示只有https协议才能访问
    },
    rolling: true, //常用属性，刷新过期时间，或者说重新设置过期时间，
  })
);

// 模块化
app.use("/api", routerApi);
app.use("/blog", routerBlog);
app.use("/user", routerUser);

// 在所有路由之后处理404内容
app.use("/*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("404 Not Found");
});

// 所有中间件之后挂载错误处理中间件

app.listen(3333, () => {
  console.log("port 3333 running ===> http://localhost:3333");
});
