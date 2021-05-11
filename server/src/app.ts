import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser"

const connectDB = require("./config/db");
const postRoutes = require("./routes/posts")

const app: express.Application = express();

app.use(cors());

app.use('/posts', postRoutes)
app.use(cookieParser());

// Config .env to ./config/config.env
dotenv.config({ path: __dirname + "/config/config.env" });
//  Connect to database
connectDB();

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("server running on port", PORT));