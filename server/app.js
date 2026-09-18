import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import userRouter from "./routes/User.js";
import businessRouter from "./routes/Business.js";
import commentRouter from "./routes/Comment.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/business", businessRouter);
app.use("/api/comment", commentRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((req, res) => {
  res.status(404).json({
    message: "مسیر مورد نظر یافت نشد",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || "خطای داخلی سرور",

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
});

export default app;
