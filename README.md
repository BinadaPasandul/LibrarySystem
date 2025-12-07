📚 Book Ledger – Library Management System

A modern full-stack library management system built with ASP.NET Core Web API and React + TypeScript, featuring SQLite database + authentication + premium UI.

🚀 Tech Stack
Layer	       Technology 

Frontend	   React + TypeScript + Vite + Axios + Tailwind CSS

Backend	     ASP.NET Core Web API + C# + Entity Framework Core

Database     SQLite

Auth	       JWT-based Login & Registration

📌 Features

✔ User can login / register
✔ Add new books
✔ View all books with filters
✔ Edit book information
✔ Delete books
✔ SQLite persistent storage
✔ Professional UI / UX
✔ Protected routes (Add / Edit only when logged in)

📦 Folder Structure

Library-system/

│── backend/        # ASP.NET Core Web API

│── frontend/       # React + TypeScript Application

│   ├── public/

│   ├── src/

│   │   ├── pages/

│   │   ├── components/

│   │   ├── services/


🛠️ Setup Instructions
📍 Backend Setup

cd backend

dotnet restore

dotnet build

dotnet ef database update   # (If migrations exist)

dotnet run



📌 Backend will run on: http://localhost:5156

💻 Frontend Setup
cd frontend/library-frontend
npm install
npm run dev

📌 Frontend will run on: http://localhost:5173

🔐 Default API Endpoints (Examples)
Method	Endpoint	Description
POST	/api/Auth/register	User Registration
POST	/api/Auth/login	User Login
GET	/api/Books	Get All Books
POST	/api/Books	Add Book
PUT	/api/Books/{id}	Edit Book
DELETE	/api/Books/{id}	Remove Book

👨‍💻 Developer
EM Binada Pasandul
📅 2025

🔥 Extra Feature

🎉 Implemented JWT Authentication with UI lock (Not required by assignment but adds professional quality).

✔ License

This project is created as part of a software engineering internship assignment.
Usage is allowed for educational purposes only.
