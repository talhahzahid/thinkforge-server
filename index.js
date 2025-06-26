import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectdb from "./src/db/index.js";
import router from "./src/routes/user.routes.js";
import blogRouter from "./src/routes/blog.routes.js";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World Server Depoly!");
});
app.use("/api/v1", router);
app.use("/api/v2", blogRouter);

connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server Is Running At Port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
