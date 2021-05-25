import express from "express";

const router = express.Router();

const uploadImage = require("../middleware/uploadImage");
const uploadController = require("../controllers/uploadController");
const auth = require("../middleware/auth");

router.post("/uploadImage", auth, uploadImage, uploadController.uploadImage);
router.post("/deleteImage", auth, uploadController.deleteImage);

module.exports = router;
