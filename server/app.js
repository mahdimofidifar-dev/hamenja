import cors from "cors";
import express from "express";
import userRouter from "./routes/User.js";
import businessRouter from "./routes/Business.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/business", businessRouter);
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", message: "Server is healthy" });
// });

app.use((req, res, next) => {
  res.status(404).json({ message: "مسیر مورد نظر یافت نشد" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "خطای داخلی سرور",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
