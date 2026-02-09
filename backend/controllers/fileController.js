import File from "../models/File.js";
import path from "path";
import fs from "fs";
import { bucket } from "../config/gcs.js";

/* ===========================
   UPLOAD FILE (Cloud + Mongo)
=========================== */
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ User ID from JWT middleware
    const userId = req.user.id;

    // ✅ Create structured cloud file path
    const cloudFileName = `users/${userId}/${Date.now()}-${
      req.file.originalname
    }`;

    // Upload to Google Cloud
    const blob = bucket.file(cloudFileName);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      console.error("Cloud Upload Error:", err);
      return res.status(500).json({ message: "Cloud upload failed" });
    });

    blobStream.on("finish", async () => {
      // ✅ Save metadata in MongoDB
      const newFile = await File.create({
        userId: userId,
        fileName: req.file.originalname,

        // Store full cloud path
        cloudPath: cloudFileName,

        uploadedAt: new Date(),
        isDeleted: false,
      });

      res.status(201).json({
        message: "File uploaded successfully",
        file: newFile,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};


/* ===========================
   LIST USER FILES
=========================== */
export const listFiles = async (req, res) => {
  try {
    const files = await File.find({
      userId: req.user.id,
      isDeleted: false, // ✅ only active
    });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "File listing failed", error });
  }
};


/* ===========================
   DOWNLOAD FILE (Placeholder)
=========================== */
export const downloadFile = async (req, res) => {
  try {
    const fileId = req.params.id;

    // 1. Find file metadata in MongoDB
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // 2. Ownership check (only uploader can download)
    if (file.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // 3. Generate Signed URL (valid for 5 minutes)
    const [signedUrl] = await bucket.file(file.cloudPath).getSignedUrl({
      action: "read",
      expires: Date.now() + 5 * 60 * 1000, // 5 min expiry
    });

    // 4. Send URL to frontend
    res.status(200).json({
      message: "Secure download link generated",
      downloadUrl: signedUrl,
    });
  } catch (error) {
    console.error("Download Error:", error);

    res.status(500).json({
      message: "Download failed",
      error,
    });
  }
};
/* ===========================
   SOFT DELETE FILE
=========================== */
export const softDeleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Ownership check
    if (file.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // ✅ Archive only
    file.isDeleted = true;
    file.deletedAt = new Date();
    await file.save();

    res.status(200).json({
      message: "File archived successfully (soft deleted)",
    });
  } catch (error) {
    res.status(500).json({ message: "Soft delete failed", error });
  }
};

/* ===========================
   HARD DELETE FILE (CLOUD)
=========================== */
export const hardDeleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Ownership check
    if (file.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // ✅ Delete file from Google Cloud
    await bucket.file(file.cloudPath).delete();

    // ✅ Remove metadata permanently
    await File.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "File permanently deleted (hard delete)",
    });
  } catch (error) {
    res.status(500).json({ message: "Hard delete failed", error });
  }
};

/* ===========================
   LIST ARCHIVED FILES
=========================== */
export const listArchivedFiles = async (req, res) => {
  try {
    const files = await File.find({
      userId: req.user.id,
      isDeleted: true, // ✅ only archived
    });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Archived listing failed", error });
  }
};

export const restoreFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ message: "File not found" });

    if (file.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // ✅ Restore
    file.isDeleted = false;
    file.deletedAt = null;
    await file.save();

    res.status(200).json({ message: "File restored successfully" });
  } catch (error) {
    res.status(500).json({ message: "Restore failed", error });
  }
};

