import express from 'express';

const router = express.Router()

const {
  getPosts,
  createPost,
  updatePost,
} = require("../controllers/postController");

router.get('/', getPosts)
router.post("/", createPost);
router.patch("/:id", updatePost);

module.exports = router