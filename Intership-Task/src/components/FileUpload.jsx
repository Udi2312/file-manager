import React, { useState } from "react";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    onUpload(file); // send file to parent (Dashboard)
    setFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 mb-8"
    >
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full border p-2 rounded-lg"
      />

      <button className="bg-green-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-green-700 transition">
        Upload
      </button>
    </form>
  );
}
