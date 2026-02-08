import React from "react";

export default function FileCard({ file, onDownload, onSoftDelete, onHardDelete }) {
     const formattedDate = new Date(file.uploadedAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <div className="flex justify-between items-center border p-4 rounded-xl bg-gray-50">
      {/* File Info */}
      <div>
        <p className="font-semibold text-gray-800">{file.name}</p>
        <p className="text-sm text-gray-500 mt-1">
          Uploaded: {formattedDate}
        </p>      
        </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onDownload(file.id)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Download
        </button>

        <button
          onClick={() => onSoftDelete(file.id)}
          className="bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700 transition"
        >
          Soft Delete
        </button>

        <button
          onClick={() => onHardDelete(file.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
        >
          Hard Delete
        </button>
      </div>
    </div>
  );
}
