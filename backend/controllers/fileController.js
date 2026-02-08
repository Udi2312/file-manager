import File from "../models/File.js";
import path from "path";
import fs from "fs";

/* ===========================
   UPLOAD FILE
=========================== */
export const uploadFile = async (req, res) => {
  try {
    // File comes from multer middleware
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newFile = await File.create({
      userId: req.user.id,
      fileName: req.file.originalname,
      cloudPath: req.file.filename,
      uploadedAt: new Date(),
      isDeleted: false,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
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
      isDeleted: false,
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

    // 2. Check ownership (user can download only their own file)
    if (file.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // 3. File path in uploads folder
    const filePath = path.join("uploads", file.cloudPath);

    // 4. Check if file exists on server
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File missing on server" });
    }

    // 5. Send file as downloadable attachment
    res.download(filePath, file.fileName, (err) => {
      if (err) {
        console.error("Download Error:", err);
        res.status(500).json({ message: "Download failed" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Download failed", error });
  }
};

/* ===========================
   SOFT DELETE FILE
=========================== */
export const softDeleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ message: "File not found" });

    // Delete file from uploads folder
    const filePath = path.join("uploads", file.cloudPath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    file.isDeleted = true;
    file.deletedAt = new Date();
    await file.save();

    res.status(200).json({ message: "File soft deleted" });
  } catch (error) {
    res.status(500).json({ message: "Soft delete failed", error });
  }
};

/* ===========================
   HARD DELETE FILE
=========================== */
export const hardDeleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ message: "File not found" });

    // Delete file from uploads folder
    const filePath = path.join("uploads", file.cloudPath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete metadata from MongoDB
    await File.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "File permanently deleted" });
  } catch (error) {
    res.status(500).json({ message: "Hard delete failed", error });
  }
};
