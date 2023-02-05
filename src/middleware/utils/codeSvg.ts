const svgCaptcha = require("svg-captcha");

exports.getSvgCode = () => {
  // 配置背景图片颜色集合
  const colorMap = [
    "#eeeeee",
    "#edfedf",
    "#eeddff",
    "skyblue",
    "orange",
    "#c8c8c8",
  ];

  //随机颜色
  const randomColor = colorMap[Math.floor(Math.random() * colorMap.length)];

  const options = {
    size: 4, // 验证码长度
    ignoreChars: "0oO1lI", // 排除字符
    noise: 2, // 干扰条数
    width: 160,
    height: 50,
    fontSize: 50,
    color: true,
    background: randomColor,
  };

  return svgCaptcha.create(options);
};
