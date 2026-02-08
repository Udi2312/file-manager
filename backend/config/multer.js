import multer from "multer";
import path from "path";

/* ===========================
   MULTER STORAGE CONFIG
=========================== */

// Store file temporarily in "uploads/" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

/* ===========================
   FILE FILTER (Optional)
=========================== */
const fileFilter = (req, file, cb) => {
  // Allow all file types for now
  cb(null, true);
};

/* ===========================
   MULTER UPLOAD INSTANCE
=========================== */
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export default upload;
