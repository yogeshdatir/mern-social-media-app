import express from 'express';

const router = express.Router()

const {
  getPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/postController");
const auth = require("../middleware/auth");

router.get('/', getPosts)
router.get("/search", getPostsBySearch);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

module.exports = router