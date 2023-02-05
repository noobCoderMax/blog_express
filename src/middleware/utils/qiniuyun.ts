const qiniu = require("qiniu");

const { accessKey, secretKey } = require("../../config/config.default");

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const options = {
  scope: "qpblog",
  expires: 60 * 60,
};

const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

module.exports = {
  uploadToken,
};
