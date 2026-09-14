import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import userRouter from "./routes/User.js";
import businessRouter from "./routes/Business.js";

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

// 404
app.use((req, res, next) => {
  res.status(404).json({
    message: "مسیر مورد نظر یافت نشد",
  });
});

// Error Handler
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
