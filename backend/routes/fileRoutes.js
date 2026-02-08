import express from "express";
import upload from "../config/multer.js";

import {
  uploadFile,
  listFiles,
  downloadFile,
  softDeleteFile,
  hardDeleteFile,
} from "../controllers/fileController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================
   FILE ROUTES (Protected)
=========================== */

// Upload File
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadFile
);

// List Files
router.get("/", authMiddleware, listFiles);

// Download File
router.get("/:id/download", authMiddleware, downloadFile);

// Soft Delete File
router.patch("/:id/soft-delete", authMiddleware, softDeleteFile);

// Hard Delete File
router.delete("/:id/hard-delete", authMiddleware, hardDeleteFile);

export default router;
