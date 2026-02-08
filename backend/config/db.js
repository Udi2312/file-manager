import mongoose from "mongoose";

/* ===========================
   CONNECT MONGODB
=========================== */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `✅ MongoDB Connected Successfully: ${conn.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;
