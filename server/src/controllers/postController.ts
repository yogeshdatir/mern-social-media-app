import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { nodeModuleNameResolver } from "typescript";

const PostModel = require("../models/postModel");

const postController = {
  getPost: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const post = await PostModel.findById(id);

      res.status(200).json(post);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },
  getPosts: async (req: Request, res: Response) => {
    const { page } = req.query;

    try {
      const LIMIT = 8;
      const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
      const total = await PostModel.countDocuments({});

      const posts = await PostModel.find()
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(startIndex);

      res.status(200).json({
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  getPostsBySearch: async (req: Request, res: Response) => {
    const { searchQuery, tags } = req.query;

    try {
      if (searchQuery === "none" && tags === "") {
        const posts = await PostModel.find();
        return res.status(200).json({
          data: posts,
        });
      }
      const title = new RegExp(<any>searchQuery, "i");

      const posts = await PostModel.find({
        $or: [{ title }, { tags: { $in: (<any>tags).split(",") } }],
      });

      res.status(200).json({ data: posts });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  createPost: async (req: Request, res: Response) => {
    const post = req.body;
    const newPost = new PostModel({
      ...post,
      creator: (<any>req).userId,
      createdAt: new Date().toISOString(),
    });
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

      const postToUpdate = await PostModel.findById(_id);

      if (postToUpdate.creator !== (<any>req).userId)
        return res.status(403).json({ message: "Not authorized" });

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
  deletePost: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with this id.");

      const postToDelete = await PostModel.findById(id);

      if (postToDelete.creator !== (<any>req).userId)
        return res.status(403).json({ message: "Not authorized" });

      await PostModel.findByIdAndRemove(id);

      res.json({ message: "post deleted successfully." });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
  likePost: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!(<any>req).userId) return res.json({ message: "Unauthenticated" });

      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with this id.");

      const post = await PostModel.findById(id);

      const index = post.likes.findIndex(
        (id: string) => id === String((<any>req).userId)
      );

      if (index === -1) {
        post.likes.push((<any>req).userId);
      } else {
        post.likes = post.likes.filter(
          (id: string) => id !== String((<any>req).userId)
        );
      }

      const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
        new: true,
      });

      res.json(updatedPost);
    } catch (error: any) {
      console.log(error);
      res.status(400).json(error);
    }
  },
};

module.exports = postController;
