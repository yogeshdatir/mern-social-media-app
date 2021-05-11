import express, {Request, Response} from "express";

const PostModel = require("../models/postModel");

const authController = {
  getPosts: async (req: Request, res: Response) => {
    try {
      const posts = await PostModel.find()
      res.status(200).json(posts)
    } catch (error: any) {
      res.status(400).json({message: error.message})
    }
  },
  createPost: async (req: Request, res: Response) => {
    const post = req.body
    const newPost = new PostModel(post)
    try {
      await newPost.save()
      res.status(201).json(newPost)
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = authController;
