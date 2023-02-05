const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// const signScriet = "shhhhh";
// 同步生成token
// let token = jwt.sign({ foo: "bar", name: "kuuga" }, signScriet);
// 同步验证token
// const result = jwt.verify(token, signScriet);

// exports.jwtSighSync = () => {
//   return jwt.sign(
//     { foo: "bar" },
//     "shhhhh",
//     { algorithm: "RS256" },
//     function (err: Error, token: string) {
//       if (err) {
//         return console.log("tokenErr", err);
//       }

//       console.log("tkoen", token);
//     }
//   );
// };

// exports.jwtVerify = (token: string) => {
//   return jwt.verify(token, signScriet, (err: Error, token: string) => {
//     if (err) {
//       return console.log("token验证失败", err);
//     }
//     console.log("token验证成功");
//   });
// };

exports.jwtDecode = promisify(jwt.decode);
exports.jwtSighSync = promisify(jwt.sign);
exports.jwtVerify = promisify(jwt.verify);
