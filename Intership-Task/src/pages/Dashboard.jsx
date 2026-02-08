import React, { useState } from "react";
import Navbar from "../components/Navbar"
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import { useEffect } from "react";

export default function Dashboard() {
  const [files , setFiles] = useState([
    { id: 1, name: "resume.pdf", uploadedAt: "2026-02-07" },
    { id: 2, name: "photo.png", uploadedAt: "2026-02-06" },
  ]);
  
 const handleUpload = async (file) => {
  try {
    const token = localStorage.getItem("token");

    // ✅ FormData is required for file upload
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // JWT required
      },
      body: formData, // send file
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("✅ File Uploaded Successfully!");
    console.log("Uploaded File Response:", data);

    // ✅ Refresh file list to show new file immediately
    fetchFiles();
  } catch (error) {
    console.log("Upload Error:", error);
    alert("Upload Failed!");
  }
};


  const handleDownload = async (id) => {
    console.log(id);
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

  const blob = await res.blob(); // ✅ not json()

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "file"; // backend provides real name
  a.click();
    console.log("Download Response:", a);
  } catch (error) {
    console.log("Download Error:", error);
    alert("Download Failed!");
  }
};


 const handleSoftDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/files/${id}/soft-delete`,
      {
        method: "PATCH",
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

    alert("🗑️ File Soft Deleted Successfully!");
    console.log("Soft Delete Response:", data);

    // ✅ Refresh file list after delete
    fetchFiles();
  } catch (error) {
    console.log("Soft Delete Error:", error);
    alert("Soft Delete Failed!");
  }
};

const handleHardDelete = async (id) => {
  const confirmDelete = window.confirm("⚠️ This will permanently delete the file. Are you sure?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/files/${id}/hard-delete`,
      {
        method: "DELETE",
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

    alert("🔥 File Permanently Deleted Successfully!");
    console.log("Hard Delete Response:", data);

    // ✅ Refresh file list after delete
    fetchFiles();
  } catch (error) {
    console.log("Hard Delete Error:", error);
    alert("Hard Delete Failed!");
  }
};

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
      // Map MongoDB _id to id for consistency
      const filesWithId = data.map(file => ({
        ...file,
        id: file._id
      }));
      setFiles(filesWithId); // update UI with real MongoDB files
    }
  } catch (error) {
    console.log("Fetch Files Error:", error);
  }
};

useEffect(() => {
  fetchFiles();
}, []);


  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto">
        <Navbar />

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <FileUpload onUpload={handleUpload} />
          <FileList
            files={files}
            onDownload={handleDownload}
            onSoftDelete={handleSoftDelete}
            onHardDelete={handleHardDelete}
          />
        </div>
      </div>
    </div>
  );
}
