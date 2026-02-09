import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";

dotenv.config();

// Create storage instance
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

export { bucket };
