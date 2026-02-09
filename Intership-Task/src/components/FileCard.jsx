import React from "react";

export default function FileCard({
  file,
  onDownload,
  onSoftDelete,
  onHardDelete,
  onRestore,
  isArchived = false,
}) {
  const formattedDate = new Date(file.uploadedAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="flex justify-between items-center border p-4 rounded-xl bg-gray-50">
      {/* File Info */}
      <div>
        <p className="font-semibold text-gray-800">{file.fileName}</p>
        <p className="text-sm text-gray-500 mt-1">
          Uploaded: {formattedDate}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        {/* Download always */}
        <button
          onClick={() => onDownload(file.id)}
          className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Download
        </button>

        {/* ✅ If Active File → Archive */}
        {!isArchived && (
          <button
            onClick={() => onSoftDelete(file.id)}
            className="px-3 py-1.5 text-sm rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Archive
          </button>
        )}

        {/* ✅ If Archived File → Restore */}
        {isArchived && (
          <button
            onClick={() => onRestore(file.id)}
            className="px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Restore
          </button>
        )}

        {/* Hard Delete always */}
        <button
          onClick={() => onHardDelete(file.id)}
          className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
