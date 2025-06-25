import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectdb from "./src/db/index.js";
import router from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.port;
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1", router);

connectdb()
  .then(() => {
    app.listen(process.env.port, () => {
      console.log("Server Is Running At Port", process.env.port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
