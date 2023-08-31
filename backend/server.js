import path from "path";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import colors from "colors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import projectCategoryRoutes from "./routes/projectCategoryRoutes.js";
import fileUploaderRoutes from "./routes/fileUploaderRoutes.js";
import specificationRoutes from "./routes/specificationRoutes.js";
import amenitieRoutes from "./routes/amenitieRoutes.js";
import contactusRoutes from "./routes/contactusRoutes.js";
import appNewsRoutes from "./routes/appNewsRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const __dirname = path.resolve();

// Deployment configuration
//configure env file in dev mode
dotenv.config();
console.log("process.env.NODE_ENV =",process.env.NODE_ENV)
// configure env file in production
if (process.env.NODE_ENV === undefined) {
  dotenv.config({ path: "../.env" });
}

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "*",
  }),
);

// API routes
app.use("/api/user", userRoutes);
app.use("/api/projectCategory", projectCategoryRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/imageUpload", fileUploaderRoutes);
app.use("/api/specification", specificationRoutes);
app.use("/api/amenities", amenitieRoutes);
app.use("/api/appnews", appNewsRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/contactus", contactusRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")),
  );
}
app.use(express.static(path.join(__dirname,"/frontend/public")))
// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
      .yellow.bold,
  ),
);
