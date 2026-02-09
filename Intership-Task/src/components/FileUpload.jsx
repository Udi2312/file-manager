import React, { useRef, useState } from "react";

export default function FileUpload({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // ✅ Reference to input element
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    // Call parent upload function
    await onUpload(selectedFile);

    // ✅ Clear selected file state
    setSelectedFile(null);

    // ✅ Clear input field manually
    fileInputRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 items-center"
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        className="w-full border rounded-lg p-2 text-sm"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
      >
        Upload
      </button>
    </form>
  );
}
