import multer from "multer";

/* ===========================
   MULTER MEMORY STORAGE CONFIG
   (Best for Cloud Upload)
=========================== */

const storage = multer.memoryStorage();

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
