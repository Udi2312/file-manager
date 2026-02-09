import React from "react";

export default function FileCard({ file, onDownload, onSoftDelete, onHardDelete }) {
  const formattedDate = new Date(file.uploadedAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border border-gray-200 p-4 rounded-lg bg-white">
      {/* File Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{file.name}</p>
        <p className="text-sm text-gray-500 mt-0.5">{formattedDate}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onDownload(file.id)}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 font-medium text-sm"
        >
          Download
        </button>

        <button
          onClick={() => onSoftDelete(file.id)}
          className="bg-yellow-600 text-white px-3 py-1.5 rounded-md hover:bg-yellow-700 font-medium text-sm"
        >
          Archive
        </button>

        <button
          onClick={() => onHardDelete(file.id)}
          className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 font-medium text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
