import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [archivedFiles, setArchivedFiles] = useState([]);
const [showArchived, setShowArchived] = useState(false);

  /* ===========================
     FETCH FILES
  =========================== */
  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/files", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        const filesWithId = data.map((file) => ({
          ...file,
          id: file._id,
        }));

        setFiles(filesWithId);
      }
    } catch (error) {
      console.log("Fetch Files Error:", error);
    } finally {
      setLoading(false);
    }
  };

  
  /* ===========================
     UPLOAD FILE
  =========================== */
  const handleUpload = async (file) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:5000/api/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        alert("Upload failed!");
        return;
      }

      fetchFiles();
    } catch (error) {
      console.log("Upload Error:", error);
    }
  };

  /* ===========================
     DOWNLOAD FILE
  =========================== */
  const handleDownload = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/files/${id}/download`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // ✅ Open signed URL directly
    window.open(data.downloadUrl, "_blank");

  } catch (error) {
    console.log("Download Error:", error);
    alert("Download Failed!");
  }
};
  /* ===========================
     SOFT DELETE
  =========================== */
  const handleSoftDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/files/${id}/soft-delete`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchFiles();
      fetchArchivedFiles();
    } catch (error) {
      console.log("Soft Delete Error:", error);
    }
  };

  /* ===========================
     HARD DELETE
  =========================== */
  const handleHardDelete = async (id) => {
    const confirmDelete = window.confirm(
      "This will permanently delete the file. Continue?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/files/${id}/hard-delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchFiles();
    } catch (error) {
      console.log("Hard Delete Error:", error);
    }
  };

  const handleRestore = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/files/${id}/restore`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchFiles();
    fetchArchivedFiles();
  } catch (error) {
    console.log("Restore Error:", error);
  }
};


  const fetchArchivedFiles = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/files/archived", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      const filesWithId = data.map((file) => ({
        ...file,
        id: file._id,
      }));

      setArchivedFiles(filesWithId);
    }
  } catch (error) {
    console.log("Fetch Archived Error:", error);
  }
};
useEffect(() => {
    fetchFiles();
      fetchArchivedFiles(); 
  }, []);


  /* ===========================
     UI
  =========================== */
  return (
  <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10">
    <div className="w-full max-w-5xl px-6 space-y-6">
      {/* Navbar */}
      <Navbar />

      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-gray-900">
          Your Files
        </h1>
        <p className="text-sm text-gray-500">
          Upload, manage and securely download your documents.
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-white border rounded-2xl p-6">
        <FileUpload onUpload={handleUpload} />
      </div>

      {/* Files Section */}
      <div className="bg-white border rounded-2xl p-6">
        {loading ? (
          <p className="text-gray-500 text-sm">Loading files...</p>
        ) : files.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No files uploaded yet. Upload your first file above 📂
          </p>

        ) : (
          <FileList
            files={files}
            onDownload={handleDownload}
            onSoftDelete={handleSoftDelete}
            onHardDelete={handleHardDelete}
              isArchived={false}
          />
        )}
      </div>

      <div className="mt-8">
  <button
    onClick={() => setShowArchived(!showArchived)}
    className="text-sm font-medium text-gray-600 hover:text-black transition"
  >
    {showArchived ? "Hide Archived Files ▲" : "View Archived Files ▼"}
  </button>

  {showArchived && (
    <div className="mt-4 bg-gray-50 border rounded-xl p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Archived Files 🗑️
      </h2>

      {archivedFiles.length === 0 ? (
        <p className="text-sm text-gray-500">No archived files.</p>
      ) : (
        <FileList
          files={archivedFiles}
          onDownload={handleDownload}
          onRestore={handleRestore}
          onHardDelete={handleHardDelete}
            isArchived={true}
        />
      )}
    </div>
  )}
</div>
    </div>
  </div>
);

}
