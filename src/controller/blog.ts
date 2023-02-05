import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
const { Blog, User } = require("../model/index");

// 根据id查询博客
exports.getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author");
    if (!blog) {
      return res.status(404).end();
    }
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(error);
  }
};

// 根据id删除博客
exports.deleteBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send("根据id删除博客");
  } catch (error) {
    next(error);
  }
};

// 新建博客
exports.addBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = new Blog(req.body);
    blog.author = (req as any).user._id;
    blog.populate("author");
    await blog.save();
    res.status(201).json({
      blog,
    });
  } catch (error) {
    next(error);
  }
};

// 修改博客
exports.updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send("修改博客");
  } catch (error) {
    next(error);
  }
};

// 分页条件查询
exports.getBlogByPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      pageSize,
      currentPage,
      tag,
      type,
      userName,
    }: {
      pageSize: number;
      currentPage: number;
      tag: string;
      type: string;
      userName: string;
    } = req.body;

    const filter: any = {};
    if (tag) {
      filter.tagList = tag;
    }
    if (type) {
      filter.type = type;
    }

    if (userName) {
      const user = User.findOne({ username: userName });
      filter.author = user ? user._id : null;
    }

    const blogs = await Blog.find(filter)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .sort({
        updateTime: -1,
      })
      .populate("author");
    const blogCount = await Blog.countDocuments();
    res.status(200).json({
      blogs,
      blogCount,
    });
  } catch (error) {
    next(error);
  }
};

// 批量删除
exports.deleteBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send("批量删除");
  } catch (error) {
    next(error);
  }
};

// 博客点赞
exports.likeBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send("博客点赞");
  } catch (error) {
    next(error);
  }
};

// 评论
exports.comment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send("博客评论");
  } catch (error) {
    next(error);
  }
};
