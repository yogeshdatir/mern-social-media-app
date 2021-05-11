import mongoose from "mongoose";

const connectDB = async () => {
  const connection = await mongoose.connect(
    `${process.env.MONGO_URI}` || "",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) console.log(err);
    }
  );

  console.log(`MongoDB Connected: ${connection}`);
};

// import { Client } from "pg";

// const connectDB = async () => {
//   const client = new Client({
//     user: "postgres",
//     host: "localhost",
//     database: "shopbasket_db",
//     password: "yash132yog",
//     port: 5432,
//   });
//   await client.connect();
//   console.log(`Postgresql Connected: ${client.host}`);
//   // client.query("SELECT NOW()", (err, res) => {
//   //   console.log(err, res);
//   //   client.end();
//   // });
// };

module.exports = connectDB;
