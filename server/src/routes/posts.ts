import express from 'express';

const router = express.Router()

const { getPosts, createPost } = require("../controllers/postController");

router.get('/', getPosts)
router.post("/", createPost);

module.exports = router