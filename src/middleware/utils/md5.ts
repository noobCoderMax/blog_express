const cryptoMe = require("crypto");

module.exports = (str: string) => {
  return cryptoMe
    .createHash("md5")
    .update("kuuga" + str)
    .digest("hex");
};
