import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

/* ===========================
   LOAD ENV VARIABLES
=========================== */
dotenv.config();

/* ===========================
   INITIALIZE APP
=========================== */
const app = express();

/* ===========================
   MIDDLEWARES
=========================== */
app.use(cors());
app.use(express.json()); // allows JSON body

/* ===========================
   CONNECT DATABASE
=========================== */
connectDB();

/* ===========================
   ROUTES
=========================== */
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

/* ===========================
   TEST ROUTE
=========================== */
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

/* ===========================
   START SERVER
=========================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
