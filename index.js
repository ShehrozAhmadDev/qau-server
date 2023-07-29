import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

import userRoutes from "./src/routes/user.router.js";
import scheduleRoutes from "./src/Routes/schedule.router.js";
import stopRoutes from "./src/routes/stop.router.js";
import routeRoutes from "./src/Routes/route.router.js";
import updateRoutes from "./src/routes/update.router.js";
import tripRoutes from "./src/routes/trip.router.js";
import driverRoutes from "./src/routes/driver.router.js";

import dotenv from "dotenv";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Connect to the MongoDB database
dotenv.config();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 4001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`App Connected on PORT ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// Set up routes

// Use the userRoutes for all routes starting with '/api'
app.use("/api/user", userRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/route", routeRoutes);
app.use("/api/stop", stopRoutes);
app.use("/api/update", updateRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/driver", driverRoutes);

// Add other route files as needed

// Start the server
