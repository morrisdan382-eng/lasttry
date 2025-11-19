import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// ROUTES
import roomRoutes from "./routes/roomRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// ====== MIDDLEWARE ======
// Enable CORS for your frontend only
app.use(cors({
  origin: 'https://691de9fd461913223c81db72--fascinating-crepe-7d436a.netlify.app', // frontend origin only
  credentials: true, // allow cookies or auth headers if needed
}));

// Parse incoming JSON
app.use(express.json());

// ====== ROUTES ======
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Smart Lighting Backend Running...");
});

// ====== CONNECT TO MONGODB AND START SERVER ======
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MongoDB URI is missing in environment variables!");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((error) => console.log("MongoDB Error:", error));
