import express from "express";
const router = express.Router();
const blogController = require("../controller/blog");
const blogValidator = require("../validator/blog");
const auth = require("../middleware/utils/auth");

router.post("/search", blogController.getBlogByPage);

router.post("/create", auth, blogValidator.create, blogController.addBlog);

router.get("/:id", blogValidator.getBlog, blogController.getBlogById);

router.delete("/:id", blogController.deleteBlogById);

router.delete("/ids", blogController.deleteBlogs);

router.put("/update", blogController.updateBlog);

router.post("/comment", blogValidator.comment, blogController.comment);

module.exports = router;
