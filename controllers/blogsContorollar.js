import blogsModal from "../models/blogModal.js";
import fs from "fs";
import slugify from "slugify";
import express from "express";
const router = express.Router();

export const createBlogsController = async (req, res) => {
  try {
    // console.log(req.fields);
    const { name = "", slug } = req.fields;

    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name required" });
      case photo && photo.size > 5000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less than 1mb" });
    }
    const newBlog = new blogsModal({ ...req.fields, slug: slugify(name) });
    if (photo) {
      newBlog.photo.data = fs.readFileSync(photo.path);
      newBlog.photo.contentType = photo.type;
    }
    await newBlog.save();
    res.status(201).send({
      success: true,
      message: "Category Blogs Successfully Created",
      newBlog,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Blogs",
      error,
    });
  }
};

export const getBlogsController = async (req, res) => {
  try {
    const blogs = await blogsModal
      .find({})
      .select("-photo")
      .limit(20)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: blogs.length,
      message: "All Blogs",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting blogs",
      error,
    });
  }
};

export const blogPhotoController = async (req, res) => {
  try {
    const blog = await blogsModal.findById(req.params.id).select("photo");
    if (blog.photo.data) {
      res.set("Content-type", blog.photo.contentType);
      return res.status(200).send(blog.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching blog photo",
      error,
    });
  }
};
