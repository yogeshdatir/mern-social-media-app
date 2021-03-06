import express, {Request, Response} from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";

// Config .env to ./config/config.env
dotenv.config({ path: __dirname + "/config/config.env" });

const connectDB = require("./config/db");
const chartPracticeRoutes = require("./routes/chartPractice")
const postRoutes = require("./routes/posts")
const userRoutes = require("./routes/users");
const uploadRoutes = require("./routes/upload");

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use('/chartData', chartPracticeRoutes)
app.use('/posts', postRoutes)
app.use("/user", userRoutes);
app.use("/image/", uploadRoutes);
app.use('/', (req: Request, res: Response) => {
  res.send('Hello to Memories API')
})

app.use(cookieParser());
//  Connect to database
connectDB();

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("server running on port", PORT));