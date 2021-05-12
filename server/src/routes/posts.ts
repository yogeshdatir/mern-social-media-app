import express from 'express';

const router = express.Router()

const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get('/', getPosts)
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router