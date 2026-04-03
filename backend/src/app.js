import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.options("*", cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import { workerRouter } from "./routes/worker.routes.js";
import { categoryRouter } from "./routes/category.routes.js";
import { subCategoryRouter } from "./routes/subCategory.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { hiringRouter } from "./routes/hiring.routes.js";

//routes declaration
app.use("/api/v1/workers", workerRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subCategory", subCategoryRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/hiring", hiringRouter);


export { app };
