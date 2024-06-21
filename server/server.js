import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/connectDB.js";
import router from "./routes/routes.js";
const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();
app.use(express.json());
dbConnect();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
///
app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is activated at / page",
  });
});

app.use("/api/", router);

app.listen(PORT, () => console.log(`server running at PORT: ${PORT}`));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
