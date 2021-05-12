import mongoose from "mongoose";
import express, { Request, Response } from "express";

const PostModel = require("../models/postModel");

const postController = {
  getPosts: async (req: Request, res: Response) => {
    try {
      const posts = await PostModel.find();
      res.status(200).json(posts);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  createPost: async (req: Request, res: Response) => {
    const post = req.body;
    const newPost = new PostModel(post);
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  updatePost: async (req: Request, res: Response) => {
    try {
      const { id: _id } = req.params;
      const post = req.body;
      if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with this id.");

      const updatedPost = await PostModel.findByIdAndUpdate(
        _id,
        { ...post, _id },
        { new: true }
      );

      res.json(updatedPost);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = postController;
