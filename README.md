# 📁 Secure File Upload & Management System  
### Internship Assignment Task

A secure full-stack file management system built as part of an Internship Assignment.  
Users can upload, download, archive, restore, and permanently delete files with authentication and cloud storage integration.

---

## 🚀 Features

- User Registration & Login (JWT Authentication)
- Secure File Upload to **Google Cloud Storage**
- File Metadata Stored in **MongoDB Atlas**
- Download Files via Signed URLs
- Archive Files (Soft Delete)
- Restore Archived Files
- Permanent Delete (Hard Delete from Cloud + DB)
- Separate Archived Files (Trash) Section

---

## 🛠 Tech Stack

**Frontend:** React, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB Atlas  
**Cloud:** Google Cloud Storage Bucket  

---

## 📂 Project Structure

frontend/src/
┣ pages/ (Login, Register, Dashboard)
┣ components/ (Navbar, FileUpload, FileList, FileCard)

backend/
┣ controllers/
┣ models/
┣ routes/
┣ middleware/
┣ config/
┗ app.js


---

## ⚙️ Setup

### Backend

```bash
cd backend
npm install
npm run dev
Create .env:

PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key

GCS_BUCKET_NAME=your_bucket_name
GOOGLE_APPLICATION_CREDENTIALS=./gcs-key.json
Frontend
cd frontend
npm install
npm run dev
Frontend runs at:

http://localhost:5173
Backend runs at:

http://localhost:5000
📌 API Endpoints
POST /api/auth/register → Register

POST /api/auth/login → Login

POST /api/files/upload → Upload File

GET /api/files → Active Files

GET /api/files/archived → Archived Files

GET /api/files/:id/download → Download

PATCH /api/files/:id/soft-delete → Archive

PATCH /api/files/:id/restore → Restore

DELETE /api/files/:id/hard-delete → Permanent Delete

👨‍💻 Developed By
Udit Bansal
B.Tech IT, Maharaja Agrasen Institute of Technology

