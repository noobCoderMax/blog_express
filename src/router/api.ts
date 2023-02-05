import express, { Request, Response } from "express";
import axios from "axios";
const getSvg = require("../middleware/utils/codeSvg");
const router = express.Router();
const apiController = require("../controller/api");

router.get("/list", async (req: Request, res: Response) => {
  const result = await axios.get(
    "https://interface.sina.cn/news/wap/fymap2020_data.d.json"
  );

  res.status(200).json({
    ...result.data.data,
  });
});

router.get("/txlist", async (req: Request, res: Response) => {
  const result = await axios.get(
    "https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail,diseaseh5Shelf"
  );

  res.status(200).json({
    ...result.data.data,
  });
});

router.get("/codeImg", async (req: Request | any, res: Response) => {
  let svg = getSvg.getSvgCode();
  res.type("image/svg+xml");
  req.session.svgCode = svg.text.toLowerCase();
  res.status(200).send(svg.data);
});

router.get("/codeVerify/:code", async (req: Request | any, res: Response) => {
  if (!req.params.code) {
    res.status(400).end();
  }

  if (req.session.svgCode) {
    if (req.params.code.toLowerCase() == req.session.svgCode) {
      res.status(200).end();
    }
  } else {
    res.send("getSession:null");
  }
});

router.get("/qntest", apiController.qiniuTest);
router.get("/qntoken", apiController.qiniuToken);

module.exports = router;
