import React from "react";
import FileCard from "./FileCard";

export default function FileList({ files, onDownload, onSoftDelete, onHardDelete }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Your Uploaded Files
      </h3>

      {files.length === 0 ? (
        <p className="text-gray-500">No files uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onDownload={onDownload}
              onSoftDelete={onSoftDelete}
              onHardDelete={onHardDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
