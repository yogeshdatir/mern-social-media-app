import express from "express";

const router = express.Router();

const { signIn, signUp } = require("../controllers/userController");

router.post("/signIn", signIn);
router.post("/signUp", signUp);

module.exports = router;
